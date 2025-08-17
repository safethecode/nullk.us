#!/usr/bin/env node

import {
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  watch,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_DIR = join(__dirname, '../apps/service/app');
const MIDDLEWARE_PATH = join(__dirname, '../apps/service/middleware.ts');

function getCustomDomainName(dirPath) {
  const customDomainPath = join(dirPath, '.custom-domain');
  try {
    const content = readFileSync(customDomainPath, 'utf-8').trim();
    return content || null;
  } catch {
    return null;
  }
}

function scanForSubdomainPages(dir, basePath = '') {
  const subdomainMappings = {};

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // 하위 디렉토리 재귀 스캔
        const subMappings = scanForSubdomainPages(
          fullPath,
          basePath ? `${basePath}/${entry}` : entry
        );
        Object.assign(subdomainMappings, subMappings);
      } else if (entry === 'page.tsx' || entry === 'page.ts') {
        // page.tsx/page.ts 파일 검사
        try {
          const content = readFileSync(fullPath, 'utf-8');

          // 'use subdomain'; 지시어 검사
          if (
            content.includes("'use subdomain';") ||
            content.includes('"use subdomain";')
          ) {
            let subdomainName = basePath.split('/')[0]; // 기본값: 첫 번째 폴더명

            // .custom-domain 파일이 있는지 확인
            const customDomain = getCustomDomainName(dirname(fullPath));
            if (customDomain) {
              subdomainName = customDomain;
              console.log(`🎨 Using custom domain name: ${customDomain}`);
            }

            if (subdomainName && subdomainName !== '') {
              subdomainMappings[subdomainName] =
                `/${basePath.split('/')[0] || subdomainName}`;
              console.log(
                `✅ Found subdomain page: ${subdomainName} -> /${basePath.split('/')[0] || subdomainName}`
              );
            }
          }
        } catch (err) {
          console.warn(`⚠️  Could not read file: ${fullPath}`);
        }
      }
    }
  } catch (err) {
    console.warn(`⚠️  Could not scan directory: ${dir}`);
  }

  return subdomainMappings;
}

function createMiddlewareTemplate(mappings) {
  const subdomainKeys = Object.keys(mappings)
    .map((key) => `'${key}'`)
    .join(' | ');
  const mappingsString = Object.entries(mappings)
    .map(([key, value]) => `  '${key}': '${value}'`)
    .join(',\n');

  return `import { type NextRequest, NextResponse } from 'next/server';

type SubdomainKey = ${subdomainKeys};

const SUBDOMAIN_MAPPER = {
${mappingsString},
} as const satisfies Record<SubdomainKey, string>;

function extractSubdomain(host: string): string {
  return host.split('.')[0] || '';
}

function isValidSubdomain(subdomain: string): subdomain is SubdomainKey {
  return subdomain in SUBDOMAIN_MAPPER;
}

function createRewriteUrl(request: NextRequest, basePath: string): URL {
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = \`\${basePath}\${request.nextUrl.pathname}\`;
  return newUrl;
}

export const middleware = (request: NextRequest) => {
  const host = request.headers.get('host');
  if (!host) {
    return NextResponse.next();
  }
  
  const subdomain = extractSubdomain(host);
  if (!isValidSubdomain(subdomain)) {
    return NextResponse.next();
  }
  
  const basePath = SUBDOMAIN_MAPPER[subdomain];
  const rewriteUrl = createRewriteUrl(request, basePath);
  
  return NextResponse.rewrite(rewriteUrl);
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\\\.ico|.*\\\\.png|.*\\\\.svg).*)',
  ],
};
`;
}

function updateMiddleware(mappings) {
  try {
    let middlewareContent;
    let isNewFile = false;
    let shouldCreateBackup = false;

    try {
      middlewareContent = readFileSync(MIDDLEWARE_PATH, 'utf-8');

      // 파일이 존재하지만 비어있거나 유효하지 않은 경우 체크
      if (!middlewareContent || middlewareContent.trim().length === 0) {
        console.log('📝 Middleware file is empty. Creating new content...');
        isNewFile = true;
      } else if (
        !middlewareContent.includes('export const middleware') &&
        !middlewareContent.includes('export default')
      ) {
        console.log('📝 Middleware file exists but invalid. Recreating...');
        isNewFile = true;
      } else {
        shouldCreateBackup = true;
      }
    } catch (err) {
      // 파일이 없으면 새로 생성
      console.log('📝 Middleware file not found. Creating new one...');
      isNewFile = true;
    }

    // 유효한 백업만 생성
    if (
      shouldCreateBackup &&
      middlewareContent &&
      middlewareContent.trim().length > 0
    ) {
      const backupPath = `${MIDDLEWARE_PATH}.backup`;
      writeFileSync(backupPath, middlewareContent);
      console.log('📁 Created backup at:', backupPath);
    }

    if (isNewFile) {
      // 새 미들웨어 파일 생성
      middlewareContent = createMiddlewareTemplate(mappings);
    } else {
      // 기존 파일 업데이트
      const subdomainKeys = Object.keys(mappings)
        .map((key) => `'${key}'`)
        .join(' | ');
      const mappingsString = Object.entries(mappings)
        .map(([key, value]) => `  '${key}': '${value}'`)
        .join(',\n');

      const newSubdomainType = `type SubdomainKey = ${subdomainKeys};`;
      const newSubDomainMapper = `const SUBDOMAIN_MAPPER = {\n${mappingsString},\n} as const satisfies Record<SubdomainKey, string>;`;

      // SubdomainKey 타입 교체
      const subdomainTypeRegex = /type SubdomainKey\s*=\s*[^;]+;/;
      // SUBDOMAIN_MAPPER 교체 (멀티라인과 따옴표를 고려한 정규식)
      const subDomainMapperRegex =
        /(const\s+SUBDOMAIN_MAPPER|const\s+subDomainMapper)\s*=\s*\{[\s\S]*?\}\s*as\s+const[^;]*;/;

      let hasValidStructure = false;

      if (
        subdomainTypeRegex.test(middlewareContent) &&
        subDomainMapperRegex.test(middlewareContent)
      ) {
        // 새 구조로 업데이트
        middlewareContent = middlewareContent.replace(
          subdomainTypeRegex,
          newSubdomainType
        );
        middlewareContent = middlewareContent.replace(
          subDomainMapperRegex,
          newSubDomainMapper
        );
        hasValidStructure = true;
      } else if (subDomainMapperRegex.test(middlewareContent)) {
        // 구 구조에서 새 구조로 변환
        middlewareContent = middlewareContent.replace(
          /import\s*\{\s*type\s+NextRequest,\s*NextResponse\s*\}\s*from\s*['"]next\/server['"];/,
          `import { type NextRequest, NextResponse } from 'next/server';\n\n${newSubdomainType}`
        );
        middlewareContent = middlewareContent.replace(
          subDomainMapperRegex,
          newSubDomainMapper
        );
        hasValidStructure = true;
      }

      if (!hasValidStructure) {
        console.warn('⚠️  Could not find compatible structure in middleware.ts');
        console.log('📝 Recreating middleware file with template...');
        middlewareContent = createMiddlewareTemplate(mappings);
      }
    }

    // 안전한 파일 작성을 위한 원자적 업데이트
    const tempPath = `${MIDDLEWARE_PATH}.tmp`;

    // 임시 파일에 먼저 작성
    writeFileSync(tempPath, middlewareContent, 'utf-8');

    // 내용 검증 - 더 유연한 검증 로직
    const isValid =
      middlewareContent.includes('export const middleware') ||
      middlewareContent.includes('export default') ||
      middlewareContent.includes('export { middleware }');

    if (!isValid || middlewareContent.trim().length === 0) {
      unlinkSync(tempPath); // 임시 파일 삭제
      throw new Error('Generated middleware content is invalid or empty');
    }

    // 검증 통과 시 원자적으로 파일 교체
    try {
      // Windows와 Unix 모두에서 안전한 원자적 교체
      if (process.platform === 'win32') {
        // Windows: 기존 파일 삭제 후 이동
        try {
          unlinkSync(MIDDLEWARE_PATH);
        } catch {
          // 파일이 없어도 괜찮음
        }
      }

      // 파일 이름 변경으로 원자적 교체
      renameSync(tempPath, MIDDLEWARE_PATH);
    } catch (renameErr) {
      // 이름 변경 실패 시 일반적인 쓰기로 폴백
      console.warn(
        '⚠️  Atomic rename failed, using regular write:',
        renameErr.message
      );
      writeFileSync(MIDDLEWARE_PATH, middlewareContent, 'utf-8');

      // 임시 파일 정리
      try {
        unlinkSync(tempPath);
      } catch {
        // 임시 파일 삭제 실패는 무시
      }
    }

    if (isNewFile) {
      console.log('✅ Created new middleware.ts with subdomain mappings');
    } else {
      console.log('✅ Updated middleware.ts with new subdomain mappings');
    }

    // 최종 검증
    try {
      const finalContent = readFileSync(MIDDLEWARE_PATH, 'utf-8');
      if (!finalContent || finalContent.trim().length === 0) {
        throw new Error('Final middleware file is empty');
      }
    } catch (verifyErr) {
      console.error('❌ Final verification failed:', verifyErr.message);
      throw verifyErr;
    }
  } catch (err) {
    console.error('❌ Failed to update middleware:', err.message);

    // 백업에서 복원 시도 (유효한 백업이 있는 경우만)
    const backupPath = `${MIDDLEWARE_PATH}.backup`;
    try {
      const backupContent = readFileSync(backupPath, 'utf-8');
      if (backupContent && backupContent.trim().length > 0) {
        writeFileSync(MIDDLEWARE_PATH, backupContent, 'utf-8');
        console.log('🔄 Restored from backup');
      } else {
        console.log('⚠️  Backup is empty, creating new middleware instead');
        const newContent = createMiddlewareTemplate(mappings);
        writeFileSync(MIDDLEWARE_PATH, newContent, 'utf-8');
        console.log('✅ Created new middleware.ts after backup restore failed');
      }
    } catch (restoreErr) {
      console.error('❌ Failed to restore from backup:', restoreErr.message);
      // 백업 복원도 실패하면 새 파일 생성
      try {
        const newContent = createMiddlewareTemplate(mappings);
        writeFileSync(MIDDLEWARE_PATH, newContent, 'utf-8');
        console.log('✅ Created new middleware.ts as fallback');
      } catch (fallbackErr) {
        console.error('❌ All recovery attempts failed:', fallbackErr.message);
        process.exit(1);
      }
    }
  }
}

function generateMappings() {
  console.log('🔍 Scanning for subdomain pages...');

  const mappings = scanForSubdomainPages(APP_DIR);

  if (Object.keys(mappings).length === 0) {
    console.log('ℹ️  No subdomain pages found');
    return;
  }

  console.log('📝 Found subdomain mappings:', mappings);

  updateMiddleware(mappings);

  console.log('🎉 Subdomain mapping generation complete!');
}

function startWatchMode() {
  console.log('👀 Starting watch mode...');
  console.log('📁 Watching:', APP_DIR);

  // 초기 스캔 실행
  generateMappings();

  let debounceTimer;
  let isProcessing = false;

  const watcher = watch(APP_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) return;

    // page.tsx, page.ts, .custom-domain 파일만 감시
    if (
      filename.includes('page.tsx') ||
      filename.includes('page.ts') ||
      filename.includes('.custom-domain')
    ) {
      console.log(`🔄 File changed: ${filename} (${eventType})`);

      // 이미 처리 중이면 스킵
      if (isProcessing) {
        console.log('⏳ Already processing, skipping...');
        return;
      }

      // 디바운싱: 1초 내 연속 변경 시 마지막 것만 실행
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        isProcessing = true;
        try {
          console.log('\n'.repeat(2));
          generateMappings();
        } catch (err) {
          console.error('❌ Error during file change processing:', err.message);
        } finally {
          isProcessing = false;
        }
      }, 1000);
    }
  });

  console.log('\n💡 Press Ctrl+C to stop watching\n');

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping watch mode...');
    clearTimeout(debounceTimer);
    watcher.close();
    process.exit(0);
  });
}

function main() {
  const args = process.argv.slice(2);
  const watchMode = args.includes('--watch') || args.includes('-w');

  if (watchMode) {
    startWatchMode();
  } else {
    generateMappings();
  }
}

main();

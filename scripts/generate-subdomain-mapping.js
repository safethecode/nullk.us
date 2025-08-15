#!/usr/bin/env node

import {
  readFileSync,
  readdirSync,
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
            const routePath = basePath || '/';
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
  const mappingsString = Object.entries(mappings)
    .map(([key, value]) => `  '${key}': '${value}'`)
    .join(',\n');

  return `import { type NextRequest, NextResponse } from 'next/server';

const subDomainMapper = {
${mappingsString},
} as const;

export const middleware = (request: NextRequest) => {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0] || '';

  if (subdomain in subDomainMapper) {
    const newUrl = request.nextUrl.clone();
    const subdomainBasePath =
      subDomainMapper[subdomain as keyof typeof subDomainMapper];

    newUrl.pathname = \`\${subdomainBasePath}\${request.nextUrl.pathname}\`;

    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|/_next/image|favicon\\\\.ico|.*\\\\.png|.*\\\\.svg).*)',
  ],
};
`;
}

function updateMiddleware(mappings) {
  try {
    let middlewareContent;
    let isNewFile = false;

    try {
      middlewareContent = readFileSync(MIDDLEWARE_PATH, 'utf-8');

      // 백업 생성
      const backupPath = MIDDLEWARE_PATH + '.backup';
      writeFileSync(backupPath, middlewareContent);
      console.log('📁 Created backup at:', backupPath);
    } catch (err) {
      // 파일이 없으면 새로 생성
      console.log('📝 Middleware file not found. Creating new one...');
      isNewFile = true;
    }

    if (isNewFile) {
      // 새 미들웨어 파일 생성
      middlewareContent = createMiddlewareTemplate(mappings);
    } else {
      // 기존 파일 업데이트
      const mappingsString = Object.entries(mappings)
        .map(([key, value]) => `  '${key}': '${value}'`)
        .join(',\n');

      const newSubDomainMapper = `const subDomainMapper = {\n${mappingsString},\n} as const;`;

      // 기존 subDomainMapper 교체 (멀티라인과 따옴표를 고려한 정규식)
      const subDomainMapperRegex =
        /const subDomainMapper\s*=\s*\{[\s\S]*?\}\s*as\s+const\s*;/;

      if (subDomainMapperRegex.test(middlewareContent)) {
        middlewareContent = middlewareContent.replace(
          subDomainMapperRegex,
          newSubDomainMapper
        );
      } else {
        console.warn('⚠️  Could not find subDomainMapper in middleware.ts');
        console.log('Current middleware content:');
        console.log(middlewareContent);
        console.log('📝 Creating new middleware file...');
        middlewareContent = createMiddlewareTemplate(mappings);
      }
    }

    // 백업에서 복원할 수 있도록 임시 파일에 먼저 작성
    const tempPath = MIDDLEWARE_PATH + '.temp';
    writeFileSync(tempPath, middlewareContent);

    // 내용 검증
    if (
      !middlewareContent.includes('export const middleware') &&
      !middlewareContent.includes('export default')
    ) {
      throw new Error('Generated middleware content is invalid');
    }

    // 검증 통과 시 실제 파일로 이동
    writeFileSync(MIDDLEWARE_PATH, middlewareContent);

    // 임시 파일 삭제
    try {
      unlinkSync(tempPath);
    } catch {
      // 임시 파일 삭제 실패는 무시
    }

    if (isNewFile) {
      console.log('✅ Created new middleware.ts with subdomain mappings');
    } else {
      console.log('✅ Updated middleware.ts with new subdomain mappings');
    }
  } catch (err) {
    console.error('❌ Failed to update middleware:', err.message);

    // 백업에서 복원 시도
    const backupPath = MIDDLEWARE_PATH + '.backup';
    try {
      const backupContent = readFileSync(backupPath, 'utf-8');
      writeFileSync(MIDDLEWARE_PATH, backupContent);
      console.log('🔄 Restored from backup');
    } catch (restoreErr) {
      console.error('❌ Failed to restore from backup:', restoreErr.message);
    }

    process.exit(1);
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

  const watcher = watch(APP_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename) return;

    // page.tsx, page.ts, .custom-domain 파일만 감시
    if (
      filename.includes('page.tsx') ||
      filename.includes('page.ts') ||
      filename.includes('.custom-domain')
    ) {
      console.log(`🔄 File changed: ${filename}`);

      // 디바운싱: 0.5초 내 연속 변경 시 마지막 것만 실행
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log('\n'.repeat(2));
        generateMappings();
      }, 500);
    }
  });

  console.log('\n💡 Press Ctrl+C to stop watching\n');

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping watch mode...');
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

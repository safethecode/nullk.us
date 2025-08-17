import { type NextRequest, NextResponse } from 'next/server';

type SubdomainKey = 'stage-engr';

const SUBDOMAIN_MAPPER = {
  'stage-engr': '/stage-engr',
} as const satisfies Record<SubdomainKey, string>;

function extractSubdomain(host: string): string {
  return host.split('.')[0] || '';
}

function isValidSubdomain(subdomain: string): subdomain is SubdomainKey {
  return subdomain in SUBDOMAIN_MAPPER;
}

function createRewriteUrl(request: NextRequest, basePath: string): URL {
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `${basePath}${request.nextUrl.pathname}`;
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
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png|.*\\.svg).*)',
  ],
};

import { type NextRequest, NextResponse } from 'next/server';

const subDomainMapper = {
  'stage-engr': '/stage-engr',
} as const;

export const middleware = (request: NextRequest) => {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0] || '';

  if (subdomain in subDomainMapper) {
    const newUrl = request.nextUrl.clone();
    const subdomainBasePath =
      subDomainMapper[subdomain as keyof typeof subDomainMapper];

    newUrl.pathname = `${subdomainBasePath}${request.nextUrl.pathname}`;

    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|/_next/image|favicon\\.ico|.*\\.png|.*\\.svg).*)',
  ],
};

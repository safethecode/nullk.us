import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    ],
    sitemap: 'https://stage-engr.nullk.us/sitemap.xml',
    host: 'https://stage-engr.nullk.us',
  };
}

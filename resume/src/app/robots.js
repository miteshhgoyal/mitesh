export const dynamic = 'force-static'

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://cv.miteshh.in/sitemap.xml',
        host: 'https://cv.miteshh.in',
    };
}

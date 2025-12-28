// app/robots.js
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://miteshgoyal.com/sitemap.xml', // Replace with YOUR domain
        host: 'https://miteshgoyal.com', // Replace with YOUR domain
    };
}

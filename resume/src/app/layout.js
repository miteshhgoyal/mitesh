import { Sora } from 'next/font/google';
import "./globals.css";
import Navbar from "../components/Navbar";

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    display: "swap",
});

export const metadata = {
    metadataBase: new URL('https://miteshgoyal.com'),
    title: {
        default: 'Mitesh Goyal - Full Stack Developer',
        template: '%s | Mitesh Goyal'
    },
    description: 'Professional resume and portfolio of Mitesh Goyal, Full Stack Web Developer specializing in MERN stack, React Native, and modern JavaScript frameworks.',
    keywords: ['Mitesh Goyal', 'Full Stack Developer', 'MERN Stack', 'React', 'Node.js', 'Portfolio', 'Resume'],
    authors: [{ name: 'Mitesh Goyal' }],
    creator: 'Mitesh Goyal',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://miteshgoyal.com',
        title: 'Mitesh Goyal - Full Stack Developer',
        description: 'Professional resume and portfolio of Mitesh Goyal, Full Stack Web Developer.',
        siteName: 'Mitesh Goyal Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mitesh Goyal - Full Stack Developer',
        description: 'Professional resume and portfolio of Mitesh Goyal.',
        creator: '@miteshhgoyal',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${sora.variable} antialiased`}
                style={{
                    backgroundColor: '#fff2c2',
                    color: '#111111',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-sora), -apple-system, sans-serif'
                }}
                suppressHydrationWarning
            >
                {/* Main Content - Proper spacing + max-width */}
                <main>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-12 py-2 sm:py-4 md:py-6 lg:py-12">
                        {/* <Navbar /> */}
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}

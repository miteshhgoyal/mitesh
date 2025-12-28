'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/m.svg';

export default function Navbar() {
    const navLinks = [
        { href: '/', label: 'resume', internal: true },
        // { href: '/portfolio', label: 'portfolio', internal: true },
        // { href: 'https://github.com/miteshhgoyal', label: 'GitHub', external: true },
        // { href: 'https://linkedin.com/in/miteshhgoyal', label: 'LinkedIn', external: true },
        // { href: 'https://x.com/miteshhgoyal', label: 'twitter', external: true },
    ];

    return (
        <nav
            className="flex items-center gap-3 mx-auto my-2 max-w-7xl"
            style={{ transition: 'all 0.3s ease' }}
        >
            {/* Logo - EXACT paste.txt styling [file:1] */}
            <Link
                href="/"
                className="block"
            >
                <Image
                    src={logo}
                    width={48}
                    height={48}
                    alt="M"
                    className="w-12 h-12 p-2 rounded-xl bg-[#fffff8] shadow-[0_12px_48px_rgba(255,34,0,0.2)] hover:shadow-[0_12px_48px_rgba(255,34,0,0.3)] transition-all duration-300"
                    priority
                />
            </Link>

            {/* Navigation Links - EXACT paste.txt .nav-link.enhance [file:1] */}
            {navLinks.map((link, index) => {
                const linkClasses = "text-[12px] font-medium text-[#ff2200] no-underline block text-right leading-none px-[10px] py-[8px] rounded-2xl bg-linear-to-r from-white to-[#fffff8] shadow-[0_12px_48px_rgba(255,34,0,0.2)] -mr-5 hover:mr-0 hover:scale-[1.05] hover:shadow-[0_12px_48px_rgba(255,34,0,0.3)] transition-all duration-300";

                return link.external ? (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                    >
                        {link.label}
                    </a>
                ) : (
                    <Link
                        key={index}
                        href={link.href}
                        className={linkClasses}
                        title={link.label}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

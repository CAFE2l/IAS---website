'use client';

import Link from 'next/link';

interface AuthLinkRowProps {
  prefix: string;
  linkText: string;
  href: string;
}

export default function AuthLinkRow({ prefix, linkText, href }: AuthLinkRowProps) {
  return (
    <p className="text-center text-sm font-sans text-white/85">
      {prefix}{' '}
      <Link
        href={href}
        className="font-semibold text-white hover:text-[#3B6FD4] transition-colors duration-150"
      >
        {linkText}
      </Link>
    </p>
  );
}
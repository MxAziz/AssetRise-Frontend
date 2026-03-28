'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  exact?: boolean;
}

export default function ActiveLink({ href, children, exact = false }: ActiveLinkProps) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? 'text-blue-600 font-bold border-b-2 border-blue-600'
          : 'text-gray-700 hover:text-blue-500'
      } transition-all duration-200`}
    >
      {children}
    </Link>
  );
}

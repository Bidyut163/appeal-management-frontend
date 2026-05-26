'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    href: string;
};

export default function MenuItem({ children, href }: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                'block p-2 hover:bg-white rounded-md ',
                isActive && 'bg-primary hover:bg-primary hover:text-white',
            )}
        >
            {children}
        </Link>
    );
}

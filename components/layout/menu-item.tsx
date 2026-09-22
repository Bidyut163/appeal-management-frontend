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
                'flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground',
                isActive && 'bg-accent text-accent-foreground',
            )}
        >
            {children}
        </Link>
    );
}

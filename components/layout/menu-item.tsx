'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    href: string;
    onNavigate?: () => void;
    excludePaths?: string[];
};

export default function MenuItem({
    children,
    href,
    onNavigate,
    excludePaths = [],
}: Props) {
    const pathname = usePathname();

    const isExcluded = excludePaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
    );

    const isActive =
        !isExcluded &&
        (pathname === href ||
            (href !== '/' && pathname.startsWith(`${href}/`)));

    return (
        <Link
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                'flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
        >
            {children}
        </Link>
    );
}

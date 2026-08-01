'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

import { ROLES } from '@/constants/roles';

export default function AppealsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const isAppellant = user?.roles.includes(ROLES.APPELLANT) ?? false;

    useEffect(() => {
        if (!isAppellant) {
            router.replace('/');
        }
    }, [isAppellant, router]);

    if (!isAppellant) return null;

    return children;
}

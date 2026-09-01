'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

import { ROLES } from '@/constants/roles';

export default function RegistrarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const isAdmin = user?.roles.includes(ROLES.ADMIN);

    useEffect(() => {
        if (!isAdmin) {
            router.replace('/');
        }
    }, [isAdmin, router]);

    if (!isAdmin) return null;

    return children;
}

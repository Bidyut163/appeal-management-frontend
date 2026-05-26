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

    const isRegistrar = user?.roles.includes(ROLES.REGISTRAR);

    useEffect(() => {
        if (!isRegistrar) {
            router.replace('/');
        }
    }, [user, router]);

    if (!isRegistrar) return null;

    return children;
}

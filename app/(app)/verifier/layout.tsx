'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

import { ROLES } from '@/constants/roles';

export default function VerifierLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const isVerifier = user?.roles.includes(ROLES.VERIFIER);

    useEffect(() => {
        if (!isVerifier) {
            router.replace('/');
        }
    }, [isVerifier, router]);

    if (!isVerifier) return null;

    return children;
}

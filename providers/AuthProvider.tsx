'use client';

import { useEffect, useState } from 'react';

import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

type Props = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
    // const { setUser, logout } = useAuthStore();
    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await apiFetch('/auth/me');

                setUser(user);
            } catch (error) {
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        getCurrentUser();
    }, [setUser, logout]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return children;
}

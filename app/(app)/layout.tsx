'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

// components
import MainMenu from '@/components/layout/main-menu';
import Navbar from '@/components/layout/navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen">
            <MainMenu />
            <section className="flex flex-col">
                <Navbar />
                <main className="p-4 flex-1 overflow-auto">{children}</main>
            </section>
        </div>
    );
}

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
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <MainMenu />
            <section className="flex flex-col min-h-0">
                <Navbar />
                <main className="min-h-0 flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </section>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

// components
import MainMenu from '@/components/layout/main-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
// import Navbar from '@/components/layout/navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, router]);

    // Close the mobile drawer after navigation.
    // useEffect(() => {
    //     setMobileMenuOpen(false);
    // }, [pathname]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        // <div className="grid grid-cols-[250px_1fr] h-screen">
        <div className="h-screen lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
                <MainMenu />
            </aside>

            {/* Mobile header */}
            <header className="flex h-16 items-center gap-3 border-b bg-background px-4 lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-70 p-0">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation menu</SheetTitle>
                        </SheetHeader>

                        <MainMenu onNavigate={() => setMobileMenuOpen(false)} />
                    </SheetContent>
                </Sheet>

                <span className="font-semibold text-primary">Assam REAT</span>
            </header>

            {/* <section className="flex flex-col min-h-0"> */}
            <section className="flex min-h-screen min-w-0 flex-col">
                {/* <Navbar /> */}

                {/* Main content */}
                <main className="min-h-0 flex-1 overflow-y-auto p-4 contain-paint">
                    {children}
                </main>
            </section>
        </div>
    );
}

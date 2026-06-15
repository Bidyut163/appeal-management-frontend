import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins, Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

// Auth Provider - Zustand
import AuthProvider from '@/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

// const robotoHeading = Roboto({
//     subsets: ['latin'],
//     variable: '--font-heading',
// });

// const geistSans = Geist({
//     variable: '--font-geist-sans',
//     subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//     variable: '--font-geist-mono',
//     subsets: ['latin'],
// });

const popins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'AREAT APPEAL',
    description: 'E-filing for Assam REAT',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn('h-full', 'antialiased', popins.variable)}
        >
            <body className={`min-h-full flex flex-col ${popins.className}`}>
                <AuthProvider>{children}</AuthProvider>
                <Toaster
                    position="top-center"
                    richColors
                    // closeButton
                    duration={3000}
                />
            </body>
        </html>
    );
}

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html
//             lang="en"
//             className={cn(
//                 'h-full',
//                 'antialiased',
//                 geistSans.variable,
//                 geistMono.variable,
//                 robotoHeading.variable,
//             )}
//         >
//             <body className="min-h-full flex flex-col">{children}</body>
//         </html>
//     );
// }

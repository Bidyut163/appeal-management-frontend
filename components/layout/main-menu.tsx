import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';
import Link from 'next/link';
import { SunDimIcon } from 'lucide-react';

export default function MainMenu() {
    const menuItems = [
        // { label: 'My Dashboard', href: '/dashboard' },
        { label: 'File An Appeal', href: '/appeals/file' },
        { label: 'List of Appeals', href: '/appeals' },
    ];

    return (
        <nav className="bg-muted p-4 border-r overflow-y-auto flex flex-col">
            {/* <div className="border-b border-border pb-4"> */}
            <div className="pb-4">
                <MenuTitle />
            </div>
            <div className="py-4 grow">
                {menuItems.map((item) => (
                    <MenuItem key={item.href} href={item.href}>
                        {item.label}
                    </MenuItem>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                        BD
                    </AvatarFallback>
                </Avatar>
                <Link href="/" className="hover:underline">
                    Logout
                </Link>
                <button className="ml-auto">
                    <SunDimIcon />
                </button>
            </div>
        </nav>
    );
}

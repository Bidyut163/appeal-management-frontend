import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';
import Link from 'next/link';
import { SunDimIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { RoleType } from '@/types/role';

export default function MainMenu() {
    const user = useAuthStore((state) => state.user);

    type MenuItem = {
        label: string;
        href: string;
        roles: RoleType[];
    };

    const menuItems: MenuItem[] = [
        {
            label: 'File an Appeal',
            href: '/appeals/file',
            roles: ['APPELLANT'],
        },
        {
            label: 'My Appeals',
            href: '/appeals',
            roles: ['APPELLANT'],
        },
        {
            label: 'Appeals',
            href: '/verifier',
            roles: ['VERIFIER'],
        },
        {
            label: 'Appeals',
            href: '/registrar',
            roles: ['REGISTRAR'],
        },
        {
            label: 'Officials',
            href: '/admin/users',
            roles: ['ADMIN'],
        },
        {
            label: 'Create an Official',
            href: '/admin/users/create',
            roles: ['ADMIN'],
        },
    ];

    const allowedItems = menuItems.filter((item) =>
        item.roles.some((role) => user?.roles.includes(role)),
    );

    return (
        <nav className="bg-muted p-4 border-r overflow-y-auto flex flex-col">
            {/* <div className="border-b border-border pb-4"> */}
            <div className="pb-4">
                <MenuTitle />
            </div>
            <div className="py-4 grow">
                {allowedItems.map((item) => (
                    <MenuItem key={item.href} href={item.href}>
                        {item.label}
                    </MenuItem>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                        {user?.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')}
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

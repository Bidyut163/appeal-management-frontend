import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';

import type { LucideIcon } from 'lucide-react';
import {
    CalendarClockIcon,
    ClipboardListIcon,
    FileTextIcon,
    GavelIcon,
    SunDimIcon,
    UserPlusIcon,
    UsersIcon,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { RoleType } from '@/types/role';
import { Button } from '../ui/button';
import { apiFetch } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useRouter } from 'next/navigation';

export default function MainMenu() {
    const user = useAuthStore((state) => state.user);

    type MenuItem = {
        label: string;
        href: string;
        roles: RoleType[];
        icon: LucideIcon;
    };

    const menuItems: MenuItem[] = [
        {
            label: 'File an appeal',
            href: '/appeals/file',
            roles: ['APPELLANT'],
            icon: FileTextIcon,
        },
        {
            label: 'My appeals',
            href: '/appeals',
            roles: ['APPELLANT'],
            icon: ClipboardListIcon,
        },
        {
            label: 'Appeals',
            href: '/verifier',
            roles: ['VERIFIER'],
            icon: GavelIcon,
        },
        {
            label: 'Appeals',
            href: '/registrar',
            roles: ['REGISTRAR'],
            icon: GavelIcon,
        },
        {
            label: 'Under Hearing',
            href: '/registrar/appeals/under-hearing',
            roles: ['REGISTRAR'],
            icon: CalendarClockIcon,
        },
        {
            label: 'Officials',
            href: '/admin/users',
            roles: ['ADMIN'],
            icon: UsersIcon,
        },
        {
            label: 'Create an official',
            href: '/admin/users/create',
            roles: ['ADMIN'],
            icon: UserPlusIcon,
        },
    ];

    const allowedItems = menuItems.filter((item) =>
        item.roles.some((role) => user?.roles.includes(role)),
    );

    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const logoutMutation = useMutation({
        mutationFn: () =>
            apiFetch('/auth/logout', {
                method: 'GET',
            }),
        onSuccess: () => {
            logout();
            toast.success('Logout successful!');
            router.push('/login');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    return (
        <nav className="h-screen bg-muted p-4 border-r  flex flex-col">
            {/* <div className="border-b border-border pb-4"> */}
            <div className="pb-4">
                <MenuTitle />
            </div>
            <div className="py-4 grow">
                {allowedItems.map((item) => (
                    <MenuItem key={item.href} href={item.href}>
                        <item.icon className="size-4" />
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

                <Button
                    className="cursor-pointer"
                    variant="ghost"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                >
                    Logout
                </Button>
                <button className="ml-auto">
                    <SunDimIcon />
                </button>
            </div>
        </nav>
    );
}

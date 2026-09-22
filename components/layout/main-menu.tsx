import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';

import { SunDimIcon } from 'lucide-react';
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
            label: 'Appeals Under Hearing',
            href: '/registrar/appeals/under-hearing',
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

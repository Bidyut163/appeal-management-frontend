import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MenuItem from './menu-item';
import MenuTitle from './menu-title';

import type { LucideIcon } from 'lucide-react';
import {
    CalendarClockIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    FileTextIcon,
    GavelIcon,
    LogOutIcon,
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

type MainMenuProps = {
    onNavigate?: () => void;
};

export default function MainMenu({ onNavigate }: MainMenuProps) {
    const user = useAuthStore((state) => state.user);

    type MenuItem = {
        label: string;
        href: string;
        roles: RoleType[];
        icon: LucideIcon;
    };

    const menuItems: MenuItem[] = [
        // Appellant
        {
            label: 'File an Appeal',
            href: '/appeals/file',
            roles: ['APPELLANT'],
            icon: FileTextIcon,
        },
        {
            label: 'My Appeals',
            href: '/appeals',
            roles: ['APPELLANT'],
            icon: ClipboardListIcon,
        },

        // Verifier
        {
            label: 'Verification Queue',
            href: '/verifier',
            roles: ['VERIFIER'],
            icon: ClipboardCheckIcon,
        },

        // Registrar
        {
            label: 'Appeal Review',
            href: '/registrar',
            roles: ['REGISTRAR'],
            icon: GavelIcon,
        },
        {
            label: 'Hearing Management',
            href: '/registrar/appeals/under-hearing',
            roles: ['REGISTRAR'],
            icon: CalendarClockIcon,
        },

        // Admin
        {
            label: 'Officials',
            href: '/admin/users',
            roles: ['ADMIN'],
            icon: UsersIcon,
        },
        {
            label: 'Create an Official',
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
        <nav className="h-full min-h-screen bg-muted p-4 border-r flex flex-col">
            {/* <div className="border-b border-border pb-4"> */}
            <div className="border-b border-border pb-5">
                <MenuTitle />
            </div>
            <div className="flex-1 space-y-1 py-5">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Workspace
                </p>

                {allowedItems.map((item) => (
                    <MenuItem
                        key={item.href}
                        href={item.href}
                        onNavigate={onNavigate}
                        excludePaths={
                            item.href === '/registrar'
                                ? ['/registrar/appeals/under-hearing']
                                : item.href === '/appeals'
                                  ? ['/appeals/file']
                                  : item.href === '/admin/users'
                                    ? ['/admin/users/create']
                                    : []
                        }
                    >
                        <item.icon className="size-4.5 shrink-0" />
                        {item.label}
                    </MenuItem>
                ))}
            </div>

            <div className="border-t border-border pt-4">
                <div className="flex gap-3 items-center">
                    <Avatar className="size-10 shrink-0">
                        <AvatarFallback className="bg-primary text-white font-medium">
                            {user?.name
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                            {user?.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            {user?.roles
                                .map(
                                    (role) =>
                                        role.charAt(0) +
                                        role.slice(1).toLowerCase(),
                                )
                                .join(', ')}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => logoutMutation.mutate()}
                        disabled={logoutMutation.isPending}
                        aria-label="Logout"
                        title="Logout"
                    >
                        <LogOutIcon className="size-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}

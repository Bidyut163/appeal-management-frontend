'use client';

import { Badge } from '@/components/ui/badge';
import type { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Official = {
    id: number;
    name: string;
    email: string;
    roles: ('VERIFIER' | 'REGISTRAR')[];
};

const roleConfig = {
    VERIFIER: {
        label: 'Verifier',
        variant: 'secondary' as const,
    },
    REGISTRAR: {
        label: 'Registrar',
        variant: 'outline' as const,
    },
};

export const columns: ColumnDef<Official>[] = [
    {
        accessorKey: 'id',
        header: 'Official ID',
        cell: ({ row }) => (
            <span className="font-medium tabular-nums text-muted-foreground">
                #{row.original.id}
            </span>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Official Name',
        cell: ({ row }) => (
            <span className="font-medium text-foreground">
                {row.original.name}
            </span>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
        cell: ({ row }) => (
            <span className="text-muted-foreground">{row.original.email}</span>
        ),
    },
    {
        accessorKey: 'roles',
        header: 'Assigned Roles',
        cell: ({ row }) => (
            <div className="flex flex-wrap items-center gap-2">
                {row.original.roles.map((role) => {
                    const config = roleConfig[role];

                    return (
                        <Badge key={role} variant={config.variant}>
                            {config.label}
                        </Badge>
                    );
                })}
            </div>
        ),
    },
];

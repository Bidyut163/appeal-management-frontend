'use client';

import type { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Official = {
    id: number;
    name: string;
    email: string;
    roles: ('VERIFIER' | 'REGISTRAR')[];
};

export const columns: ColumnDef<Official>[] = [
    {
        accessorKey: 'id',
        header: 'Official ID',
    },
    {
        accessorKey: 'name',
        header: 'Official Name',
    },
    {
        accessorKey: 'email',
        header: 'Official Email',
    },
    {
        accessorKey: 'roles',
        header: 'Role',
        cell: ({ row }) => row.original.roles.join(', '),
    },
];

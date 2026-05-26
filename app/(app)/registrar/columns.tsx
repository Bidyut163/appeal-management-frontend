'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appeal = {
    id: number;
    description: string;
};

export const columns: ColumnDef<Appeal>[] = [
    {
        accessorKey: 'id',
        header: 'Appeal ID',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        id: 'actions',
        header: 'View Detail',
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <Button variant="outline" asChild>
                    <Link href={`/registrar/appeals/${id}`}>View</Link>
                </Button>
            );
        },
    },
];

'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { ColumnDef } from '@tanstack/react-table';

import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appeal = {
    id: number;
    appellantName: string;
    respondentName: string;
    createdAt: string;
};

export const columns: ColumnDef<Appeal>[] = [
    {
        accessorKey: 'id',
        header: 'Appeal ID',
    },
    {
        accessorKey: 'appellantName',
        header: 'Appellant Name',
    },
    {
        accessorKey: 'respondentName',
        header: 'Respondent Name',
    },
    {
        accessorKey: 'createdAt',
        header: 'Filed On',
        cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <Button variant="outline" asChild>
                    <Link href={`/verifier/appeals/${id}`}>View</Link>
                </Button>
            );
        },
    },
];

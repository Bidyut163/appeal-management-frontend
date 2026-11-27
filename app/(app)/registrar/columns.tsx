'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpRightIcon } from 'lucide-react';
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
        cell: ({ row }) => (
            <span className="font-semibold tabular-nums text-foreground">
                #{row.original.id}
            </span>
        ),
    },
    {
        accessorKey: 'appellantName',
        header: 'Appellant Name',
        cell: ({ row }) => (
            <span className="font-medium">{row.original.appellantName}</span>
        ),
    },
    {
        accessorKey: 'respondentName',
        header: 'Respondent Name',
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.respondentName}
            </span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Filed On',
        cell: ({ row }) => (
            <span className="text-muted-foreground tabular-nums">
                {formatDate(row.original.createdAt)}
            </span>
        ),
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <div className="flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/registrar/appeals/${id}`}>
                            View Details
                            <ArrowUpRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];

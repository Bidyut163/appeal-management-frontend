'use client';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Hearing = {
    id: number;
    hearingNumber: number;
    hearingDate: string;
    status: 'SCHEDULED' | 'COMPLETED';
};

export type Appeal = {
    id: number;
    appellantName: string;
    respondentName: string;
    createdAt: string;

    hearings: Hearing[];
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
        id: 'hearing',
        header: 'Current Hearing',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) {
                return '—';
            }

            return `Hearing ${hearing.hearingNumber}`;
        },
    },
    {
        id: 'hearingDate',
        header: 'Hearing Date',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) {
                return '—';
            }

            return formatDate(hearing.hearingDate);
        },
    },
    {
        id: 'hearingStatus',
        header: 'Hearing Status',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) {
                return '—';
            }

            return hearing.status;
        },
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <Button variant="outline" asChild>
                    <Link href={`/registrar/appeals/under-hearing/${id}`}>
                        View
                    </Link>
                </Button>
            );
        },
    },
];

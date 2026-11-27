'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpRightIcon } from 'lucide-react';
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

const hearingStatusConfig = {
    SCHEDULED: {
        label: 'Scheduled',
        variant: 'default',
    },
    COMPLETED: {
        label: 'Completed',
        variant: 'secondary',
    },
} as const;

export const columns: ColumnDef<Appeal>[] = [
    {
        accessorKey: 'id',
        header: 'Appeal ID',
        cell: ({ row }) => (
            <span className="font-semibold tabular-nums">
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
    },
    {
        accessorKey: 'createdAt',
        header: 'Filed On',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {formatDate(row.original.createdAt)}
            </span>
        ),
    },

    {
        id: 'hearing',
        header: 'Current Hearing',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) return '—';

            return (
                <span className="font-medium">
                    Hearing #{hearing.hearingNumber}
                </span>
            );
        },
    },
    {
        id: 'hearingDate',
        header: 'Hearing Date',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) return '—';

            return (
                <span className="font-medium tabular-nums">
                    {formatDate(hearing.hearingDate)}
                </span>
            );
        },
    },
    {
        id: 'hearingStatus',
        header: 'Hearing Status',
        cell: ({ row }) => {
            const hearing = row.original.hearings[0];

            if (!hearing) return '—';

            const status = hearingStatusConfig[hearing.status];

            return <Badge variant={status.variant}>{status.label}</Badge>;
        },
    },

    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                    <Link
                        href={`/registrar/appeals/under-hearing/${row.original.id}`}
                    >
                        View Details
                        <ArrowUpRightIcon className="ml-1 h-3.5 w-3.5" />
                    </Link>
                </Button>
            </div>
        ),
    },
];

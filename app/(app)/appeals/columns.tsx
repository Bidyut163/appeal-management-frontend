'use client';

import { Badge } from '@/components/ui/badge';
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
    // payment_status: 'pending' | 'success' | 'failed';
    status:
        | 'DRAFT'
        | 'UNDER_VERIFICATION'
        | 'WITH_REGISTRAR'
        | 'REVERTED_TO_APPELLANT'
        | 'UNDER_HEARING'
        | 'DISPOSED'
        | 'REJECTED';
};

// function getPaymentVariant(
//     status: Appeal['payment_status'],
// ): 'success' | 'pending' | 'failed' {
//     switch (status) {
//         case 'success':
//             return 'success';
//         case 'pending':
//             return 'pending';
//         case 'failed':
//             return 'failed';
//         default:
//             return 'pending';
//     }
// }

const statusConfig: Record<
    Appeal['status'],
    {
        label: string;
        variant:
            | 'secondary'
            | 'info'
            | 'registrar'
            | 'warning'
            | 'hearing'
            | 'success'
            | 'destructive';
    }
> = {
    DRAFT: {
        label: 'Draft',
        variant: 'secondary',
    },
    UNDER_VERIFICATION: {
        label: 'Under Verification',
        variant: 'info',
    },
    WITH_REGISTRAR: {
        label: 'With Registrar',
        variant: 'registrar',
    },
    REVERTED_TO_APPELLANT: {
        label: 'Reverted',
        variant: 'warning',
    },
    UNDER_HEARING: {
        label: 'Under Hearing',
        variant: 'hearing',
    },
    DISPOSED: {
        label: 'Disposed',
        variant: 'success',
    },
    REJECTED: {
        label: 'Rejected',
        variant: 'destructive',
    },
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
            <span className="font-medium text-foreground">
                {row.original.appellantName}
            </span>
        ),
    },
    {
        accessorKey: 'respondentName',
        header: 'Respondent Name',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.respondentName}
            </span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Filed On',
        cell: ({ row }) => (
            <span className="whitespace-nowrap text-sm text-muted-foreground">
                {formatDate(row.original.createdAt)}
            </span>
        ),
    },

    // {
    //     accessorKey: 'payment_status',
    //     header: 'Payment',
    //     cell: ({ row }) => {
    //         // const status = row.getValue(
    //         //     'payment_status',
    //         // ) as Appeal['payment_status'];

    //         const status = row.original.payment_status;

    //         return (
    //             <Badge
    //                 variant={getPaymentVariant(status)}
    //                 className="capitalize"
    //             >
    //                 {status}
    //             </Badge>
    //         );
    //     },
    // },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = statusConfig[row.original.status];
            return <Badge variant={status.variant}>{status.label}</Badge>;
        },
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const { id, status } = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/appeals/${id}`}>
                            View Details
                            <ArrowUpRightIcon className="ml-1 h-3.5 w-3.5" />
                        </Link>
                    </Button>

                    {status === 'REVERTED_TO_APPELLANT' && (
                        <Button size="sm" asChild>
                            <Link href={`/appeals/${id}/edit`}>
                                Edit & Resubmit
                            </Link>
                        </Button>
                    )}
                </div>
            );
        },
    },
];

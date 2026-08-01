'use client';

import { Badge } from '@/components/ui/badge';
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
    // payment_status: 'pending' | 'success' | 'failed';
    status:
        | 'DRAFT'
        | 'UNDER_VERIFICATION'
        | 'WITH_REGISTRAR'
        | 'REVERTED_TO_APPELLANT'
        | 'UNDER_HEARING'
        | 'CLOSED'
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

function getAppealStatusVariant(
    status: Appeal['status'],
): 'success' | 'pending' | 'default' | 'failed' {
    switch (status) {
        case 'DRAFT':
            return 'pending';
        case 'UNDER_VERIFICATION':
            return 'default';
        case 'WITH_REGISTRAR':
            return 'default';
        case 'REVERTED_TO_APPELLANT':
            return 'default';
        case 'UNDER_HEARING':
            return 'success';
        case 'CLOSED':
            return 'success';
        case 'REJECTED':
            return 'failed';
        default:
            return 'pending';
    }
}

function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

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
            // const status = row.getValue(
            //     'appeal_status',
            // ) as Appeal['appeal_status'];

            const status = row.original.status;
            return (
                <Badge
                    variant={getAppealStatusVariant(status)}
                    className="capitalize"
                >
                    {formatStatus(status)}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <Button variant="outline" asChild>
                    <Link href={`/appeals/${id}`}>View</Link>
                </Button>
            );
        },
    },
];

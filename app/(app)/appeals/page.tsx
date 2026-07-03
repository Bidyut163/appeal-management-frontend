'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';
import { apiFetch } from '@/lib/api';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { queryKeys } from '@/lib/queryKeys';

// const appeals: Appeal[] = [
//     {
//         id: 1,
//         appellant: 'Padum Deuri',
//         respondent: 'Rera Assam',
//         payment_status: 'success',
//         appeal_status: 'with_officials',
//     },
//
// ];

export default function AppealsPage() {
    const {
        data: appeals = [],
        isLoading,
        error,
    } = useQuery<Appeal[]>({
        queryKey: queryKeys.appeals,
        queryFn: () => apiFetch('/appeals'),
    });

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load appeals</CardTitle>
                </CardHeader>
                <CardContent>{getErrorMessage(error)}</CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent>Loading...</CardContent>
            </Card>
        );
    }

    if (appeals.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No appeals found</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="mb-2">To file an appeal click here </h3>
                    <Button asChild>
                        <Link href="/appeals/file">File appeal</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Appeals</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={appeals} />
            </CardContent>
        </Card>
    );
}

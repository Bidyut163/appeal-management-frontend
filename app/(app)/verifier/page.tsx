'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';

import { apiFetch } from '@/lib/api';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function VerifierPage() {
    const {
        data: appeals = [],
        isLoading,
        error,
    } = useQuery<Appeal[]>({
        // queryKey: ['appeals', 'verifier'],
        queryKey: queryKeys.verifierAppeals,
        queryFn: () => apiFetch('/verifier/appeals'),
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
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    if (appeals.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Appeals found</CardTitle>
                </CardHeader>
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

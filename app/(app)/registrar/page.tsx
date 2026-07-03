'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';

import { apiFetch } from '@/lib/api';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function RegistrarPage() {
    const {
        data: appeals = [],
        isLoading,
        error,
    } = useQuery<Appeal[]>({
        // queryKey: ['appeals', 'registrar'],
        queryKey: queryKeys.registrarAppeals,
        queryFn: () => apiFetch('/registrar/appeals'),
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
                    <CardTitle>No appeals pending registrar review</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registrar Review Queue</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={appeals} />
            </CardContent>
        </Card>
    );
}

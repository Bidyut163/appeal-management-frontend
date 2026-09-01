'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { columns, type Official } from './columns';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/ui/data-table';

export default function UsersPage() {
    const {
        data: officials = [],
        isLoading,
        error,
    } = useQuery<Official[]>({
        queryKey: queryKeys.officials,
        queryFn: () => apiFetch('/admin/officials'),
    });

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load officials</CardTitle>
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

    if (officials.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No officials found.</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="mb-2">
                        Create your first official to get started.{' '}
                    </h3>
                    <Button asChild>
                        <Link href="/admin/users/create">Create official</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Officials</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={officials} />
            </CardContent>
        </Card>
    );
}

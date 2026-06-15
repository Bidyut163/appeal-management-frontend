'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';

export default function VerifierPage() {
    const [appeals, setAppeals] = useState<Appeal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppeals = async () => {
            try {
                const appealsList = await apiFetch('/verifier/appeals');

                setAppeals(appealsList);
            } catch (error) {
                console.error(error);
                toast.error(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        };
        fetchAppeals();
    }, []);

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

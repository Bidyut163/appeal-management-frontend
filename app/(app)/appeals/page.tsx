'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';
import { apiFetch } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';

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
    const [appeals, setAppeals] = useState<Appeal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAllAppeals = async () => {
            try {
                const appealsList = await apiFetch('/appeals');
                setAppeals(appealsList);
                // console.log(appealsList);
            } catch (error) {
                console.error(error);
                toast.error(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        };

        getAllAppeals();
    }, []);

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

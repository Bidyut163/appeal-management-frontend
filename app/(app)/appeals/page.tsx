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
import { AlertCircleIcon, Clock3Icon, FileTextIcon } from 'lucide-react';

import SummaryCard from '@/components/dashboard/SummaryCard';

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
                <CardContent className="p-6">Loading appeals...</CardContent>
            </Card>
        );
    }

    // if (appeals.length === 0) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>No appeals found</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <h3 className="mb-2">To file an appeal click here </h3>
    //                 <Button asChild>
    //                     <Link href="/appeals/file">File appeal</Link>
    //                 </Button>
    //             </CardContent>
    //         </Card>
    //     );
    // }

    const totalAppeals = appeals.length;

    const needsAttention = appeals.filter(
        (appeal) => appeal.status === 'REVERTED_TO_APPELLANT',
    ).length;

    const inProgress = appeals.filter(
        (appeal) =>
            appeal.status !== 'DRAFT' &&
            appeal.status !== 'REVERTED_TO_APPELLANT' &&
            appeal.status !== 'DISPOSED' &&
            appeal.status !== 'REJECTED',
    ).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        My Appeals
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage and track the progress of your submitted appeals.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/appeals/file">
                        <FileTextIcon className="mr-1 h-4 w-4" /> File New
                        Appeal
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SummaryCard
                    title="Total Appeals"
                    value={totalAppeals}
                    description="All your applications"
                    icon={FileTextIcon}
                />

                <SummaryCard
                    title="In Progress"
                    value={inProgress}
                    description="Currently being processed"
                    icon={Clock3Icon}
                />

                <SummaryCard
                    title="Needs Attention"
                    value={needsAttention}
                    description="Returned for correction"
                    icon={AlertCircleIcon}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Appeals</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        A list of appeals you have submitted.
                    </p>
                </CardHeader>
                <CardContent>
                    {appeals.length > 0 ? (
                        <DataTable columns={columns} data={appeals} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FileTextIcon className="mb-3 h-10 w-10 text-muted-foreground" />

                            <h3 className="font-medium">
                                No appeals filed yet
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Start by filing your first appeal.
                            </p>

                            <Button asChild className="mt-4">
                                <Link href="/appeals/file">File an Appeal</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';

import { apiFetch } from '@/lib/api';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { ClipboardListIcon } from 'lucide-react';

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

    // if (error) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>Failed to load appeals</CardTitle>
    //             </CardHeader>
    //             <CardContent>{getErrorMessage(error)}</CardContent>
    //         </Card>
    //     );
    // }

    // if (isLoading) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>Loading...</CardTitle>
    //             </CardHeader>
    //         </Card>
    //     );
    // }

    // if (appeals.length === 0) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>No appeals pending registrar review</CardTitle>
    //             </CardHeader>
    //         </Card>
    //     );
    // }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Registrar Review Queue
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review appeals forwarded by the Verifying Official.
                </p>
            </div>

            {/* Pending Review Summary */}
            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Review
                        </p>

                        <p className="text-2xl font-semibold tracking-tight tabular-nums">
                            {isLoading ? '—' : error ? '—' : appeals.length}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Appeals awaiting scrutiny
                        </p>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-3">
                        <ClipboardListIcon className="h-5 w-5 text-primary" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Appeals Awaiting Scrutiny
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Loading appeals...
                        </p>
                    ) : error ? (
                        <p className="py-8 text-center text-sm text-destructive">
                            {getErrorMessage(error)}
                        </p>
                    ) : appeals.length === 0 ? (
                        <div className="py-10 text-center">
                            <ClipboardListIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-3 font-medium">
                                No appeals awaiting review
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                New appeals will appear here once forwarded by
                                the Verifying Official.
                            </p>
                        </div>
                    ) : (
                        <DataTable columns={columns} data={appeals} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

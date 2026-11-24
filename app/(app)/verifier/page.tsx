'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';

import { apiFetch } from '@/lib/api';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { ClipboardCheckIcon } from 'lucide-react';

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
                <CardContent className="p-6">
                    <p className="font-medium">Failed to load appeals</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {getErrorMessage(error)}
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">
                    Loading appeals...
                </CardContent>
            </Card>
        );
    }

    // if (appeals.length === 0) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>No Appeals found</CardTitle>
    //             </CardHeader>
    //         </Card>
    //     );
    // }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Verifier Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review submitted appeals and forward verified cases to the
                    Registrar.
                </p>
            </div>

            {/* Overview */}
            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pending Verification
                        </p>
                        <p className="text-2xl font-semibold tracking-tight">
                            {appeals.length}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Appeals awaiting your review
                        </p>
                    </div>

                    <div className="rounded-lg bg-primary/10 p-3">
                        <ClipboardCheckIcon className="h-5 w-5 text-primary" />
                    </div>
                </CardContent>
            </Card>

            {/* Appeals Queue */}
            <Card>
                <CardContent className="p-4 sm:p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold">
                            Appeals Awaiting Verification
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Review the appeal details before forwarding them to
                            the Registrar.
                        </p>
                    </div>

                    {appeals.length > 0 ? (
                        <DataTable columns={columns} data={appeals} />
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                            <ClipboardCheckIcon className="mb-3 h-8 w-8 text-muted-foreground" />
                            <p className="font-medium">
                                No appeals awaiting verification
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                New appeals requiring verification will appear
                                here.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

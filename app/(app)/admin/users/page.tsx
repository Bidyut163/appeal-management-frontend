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
import { PlusIcon, UsersIcon } from 'lucide-react';

export default function UsersPage() {
    const {
        data: officials = [],
        isLoading,
        error,
    } = useQuery<Official[]>({
        queryKey: queryKeys.officials,
        queryFn: () => apiFetch('/admin/officials'),
    });

    // if (error) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>Failed to load officials</CardTitle>
    //             </CardHeader>
    //             <CardContent>{getErrorMessage(error)}</CardContent>
    //         </Card>
    //     );
    // }

    // if (isLoading) {
    //     return (
    //         <Card>
    //             <CardContent>Loading...</CardContent>
    //         </Card>
    //     );
    // }

    // if (officials.length === 0) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>No officials found.</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <h3 className="mb-2">
    //                     Create your first official to get started.{' '}
    //                 </h3>
    //                 <Button asChild>
    //                     <Link href="/admin/users/create">Create official</Link>
    //                 </Button>
    //             </CardContent>
    //         </Card>
    //     );
    // }
    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Officials
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage tribunal officials and their assigned roles.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/admin/users/create">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Official
                    </Link>
                </Button>
            </div>

            {/* Officials table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Official Accounts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className="py-8 text-center">
                            <p className="font-medium">
                                Failed to load officials
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {getErrorMessage(error)}
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div className="py-10 text-center text-sm text-muted-foreground">
                            Loading officials...
                        </div>
                    ) : officials.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="mb-4 rounded-full bg-muted p-4">
                                <UsersIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold">No officials yet</h3>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Create an official account to get started.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href="/admin/users/create">
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Create Official
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <DataTable columns={columns} data={officials} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

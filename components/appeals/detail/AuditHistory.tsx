'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { AuditLog } from '@/types/auditLog';
import { formatDate } from '@/utils/formatDate';
import { getAuditLogActionLabel } from '@/utils/getAuditLogActionLabel';
import { getAuditLogDetails } from '@/utils/getAuditLogDetails';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

interface Props {
    appealId: string;
}

export const AuditHistory = (props: Props) => {
    const { appealId } = props;

    const {
        data: auditHistory,
        isLoading,
        error,
    } = useQuery({
        queryKey: queryKeys.auditLog(appealId),
        queryFn: () => apiFetch(`/registrar/appeals/${appealId}/audit-logs`),
    });

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load audit log</CardTitle>
                </CardHeader>
                <CardContent>{getErrorMessage(error)}</CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent>Loading ...</CardContent>
            </Card>
        );
    }

    // if (!auditHistory) {
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>Audit history not found</CardTitle>
    //             </CardHeader>
    //         </Card>
    //     );
    // }

    if (auditHistory.length === 0) {
        return (
            <section className="space-y-3 border-b pb-6">
                <h2 className="text-base font-semibold">Audit History</h2>

                <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        No activity has been recorded yet.
                    </p>
                </div>
            </section>
        );
    }
    return (
        <section className="space-y-4 border-t-6 pt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Audit History</h2>

                <span className="text-sm text-muted-foreground">
                    {auditHistory.length} activities
                </span>
            </div>

            <div className="space-y-2">
                {auditHistory.map((log: AuditLog) => {
                    const details = getAuditLogDetails(log);

                    return (
                        <div
                            key={log.id}
                            className="rounded-lg border p-3 sm:p-4 transition-colors hover:bg-muted/20"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="space-y-1">
                                    <p className="font-semibold">
                                        {getAuditLogActionLabel(log.action)}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        By{' '}
                                        <span className="font-medium text-foreground">
                                            {log.user?.name ?? 'System'}
                                        </span>
                                    </p>
                                </div>

                                <time className="text-sm text-muted-foreground sm:text-right">
                                    {formatDate(log.createdAt)}
                                </time>
                            </div>

                            {details && (
                                <div className="mt-2 rounded-md bg-muted/40 px-3 py-2 text-sm leading-relaxed">
                                    {details}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

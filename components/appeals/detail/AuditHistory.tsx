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

    if (!auditHistory) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Audit history not found</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <section className="space-y-2 border-b pb-4">
            <h2 className="text-base font-semibold text-muted-foreground">
                Audit History
            </h2>
            <div className="space-y-3">
                {auditHistory.map((log: AuditLog) => {
                    const details = getAuditLogDetails(log);

                    return (
                        <div key={log.id} className="rounded-md border p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        {getAuditLogActionLabel(log.action)}
                                    </p>
                                    <div className="flex gap-2">
                                        <p className="text-sm text-muted-foreground">
                                            By:
                                        </p>
                                        <p className="font-medium">
                                            {log.user?.name ?? 'System'}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(log.createdAt)}
                                    </p>

                                    {details && (
                                        <p className="mt-2 text-sm">
                                            {details}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

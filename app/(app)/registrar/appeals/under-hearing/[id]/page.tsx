'use client';

import { AuditHistory } from '@/components/appeals/detail/AuditHistory';
import AppealDetailComponent from '@/components/appeals/detail/AppealDetail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { AppealDetail } from '@/types/appeal';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// import { DownloadIcon } from 'lucide-react';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AppealHeader from '@/components/appeals/detail/AppealHeader';
import { HearingHistory } from './HearingHistory';
import {
    type ScheduleNextHearingInput,
    scheduleNextHearingSchema,
} from './schemas';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

// function getPaymentVariant(
//     status: Appeal['payment_status'],
// ): 'success' | 'pending' | 'failed' {
//     switch (status) {
//         case 'success':
//             return 'success';
//         case 'pending':
//             return 'pending';
//         case 'failed':
//             return 'failed';
//         default:
//             return 'pending';
//     }
// }

export default function AppealUnderHearingPage(props: Props) {
    const { id } = use(props.params);
    const queryClient = useQueryClient();

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail | null>({
        queryKey: queryKeys.hearingAppeal(id),
        queryFn: () => apiFetch(`/registrar/appeals/under-hearing/${id}`),
    });

    const completeHearingMutation = useMutation({
        mutationFn: (data: { hearingId: number }) =>
            apiFetch(
                `/registrar/appeals/${id}/hearings/${data.hearingId}/complete`,
                {
                    method: 'PATCH',
                },
            ),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeal(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeals,
                }),
            ]);
            toast.success('Current hearing is completed.');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const scheduleNextHearingMutation = useMutation({
        mutationFn: (data: ScheduleNextHearingInput) =>
            apiFetch(`/registrar/appeals/${id}/schedule-next-hearing`, {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeal(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeals,
                }),
            ]);
            toast.success('Next hearing is scheduled!');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const form = useForm<ScheduleNextHearingInput>({
        resolver: zodResolver(scheduleNextHearingSchema),
        mode: 'onChange',
        defaultValues: {
            hearingDate: undefined,
        },
    });

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load appeal</CardTitle>
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

    if (!appeal) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Appeal not found</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <AppealHeader id={appeal.id} status={appeal.status} />
            <CardContent className="space-y-6">
                {/* Hearing History */}
                <HearingHistory
                    hearings={appeal.hearings}
                    completeHearing={(hearingId) =>
                        completeHearingMutation.mutate({ hearingId })
                    }
                    isCompletingHearing={completeHearingMutation.isPending}
                    form={form}
                    scheduleNextHearing={(data) =>
                        scheduleNextHearingMutation.mutate(data)
                    }
                    isSchedulingNextHearing={
                        scheduleNextHearingMutation.isPending
                    }
                />

                <AppealDetailComponent appeal={appeal} />
                {/* Payment */}
                {/* <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Payment
                    </h2>

                    <InfoRow label="Order ID" value={order_id} />
                    <InfoRow label="Amount" value={amount} />
                    <InfoRow
                        label="Status"
                        value={
                            <Badge variant={getPaymentVariant(status)}>
                                {formatStatus(status)}
                            </Badge>
                        }
                    />
                    <InfoRow label="Payment Mode" value={payment_mode} />
                </section> */}
                <AuditHistory appealId={id} />
            </CardContent>
        </Card>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { apiFetch } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

import RevertAppealCard from './RevertAppealCard';
import ChecklistCard from './checklist/ChecklistCard';
import HearingCard from './HearingCard';
import {
    hearingSchema,
    RevertAppealFormInput,
    RevertAppealInput,
    revertSchema,
    SendToHearingInput,
    UpdateAppealScrutinyInput,
    UpdateAppealScrutinyOutput,
    updateAppealScrutinySchema,
} from './schemas';
import type { AppealDetail } from '@/types/appeal';
import AppealDetailComponent from '@/components/appeals/detail/AppealDetail';

import AppealHeader from '@/components/appeals/detail/AppealHeader';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function RegistrarAppealDetailPage(props: Props) {
    const { id } = use(props.params);
    const router = useRouter();
    const queryClient = useQueryClient();

    const checklistForm = useForm<
        UpdateAppealScrutinyInput,
        unknown,
        UpdateAppealScrutinyOutput
    >({
        resolver: zodResolver(updateAppealScrutinySchema),
        // mode: "onChange",
        defaultValues: {
            appealNumber: '',
            complaintNumber: '',
            legalProvision: '',

            isAppealCompetent: undefined,
            arePartiesAndAddressesProper: undefined,
            isCertifiedCopyFiled: undefined,

            orderDate: undefined,
            communicationDate: undefined,
            certifiedCopyApplicationDate: undefined,
            certifiedCopyReadyDate: undefined,
            certifiedCopyReceiptDate: undefined,
            onlineFilingDate: undefined,
            hardCopySubmissionDate: undefined,

            isHardCopySubmissionDelayed: undefined,
            hardCopyDelayDays: undefined,

            isAppealWithinLimitation: undefined,
            isAppealFilingDelayed: undefined,
            appealFilingDelayDays: undefined,

            isCondonationApplicationFiled: undefined,
            objectionForCondonationDelay: '',

            areFeesPaid: undefined,
            paymentDate: undefined,

            areDocumentsFiledWithIndexPagination: undefined,
            areDocumentsLegible: undefined,

            isAppealMemoAnnexedForOtherSide: undefined,
            isAppealMemoServedByPostCourier: undefined,

            isVakalatnamaAuthorizationProper: undefined,
            isContactOnRecord: undefined,
        },
    });

    const hearingForm = useForm<SendToHearingInput>({
        resolver: zodResolver(hearingSchema),
        mode: 'onChange',
        defaultValues: {
            hearingDate: undefined,
            registrarComments: '',
        },
    });

    const revertForm = useForm<RevertAppealFormInput>({
        resolver: zodResolver(revertSchema),
        mode: 'onChange',
        defaultValues: {
            revertReason: '',
            fields: [],
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const createChecklistMutation = useMutation<
        unknown,
        Error,
        UpdateAppealScrutinyOutput
    >({
        mutationFn: (data: UpdateAppealScrutinyInput) =>
            apiFetch(`/registrar/appeals/${id}/checklist`, {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    // queryKey: ['appeal', 'registrar', id],
                    queryKey: queryKeys.registrarAppeal(id),
                }),

                queryClient.invalidateQueries({
                    // queryKey: ['appeals', 'registrar'],
                    queryKey: queryKeys.registrarAppeals,
                }),
            ]);

            // toast success message
            toast.success('Checklist created successfully.');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const sendToHearingMutation = useMutation({
        mutationFn: (data: SendToHearingInput) =>
            apiFetch(`/registrar/appeals/${id}/send-to-hearing`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            }),

        onSuccess: async () => {
            setIsDialogOpen(false);

            await queryClient.invalidateQueries({
                // queryKey: ['appeals', 'registrar'],
                queryKey: queryKeys.registrarAppeals,
            });

            // toast success message
            toast.success('Appeal sent to hearing.');
            router.push('/registrar/appeals/under-hearing');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const revertAppealMutation = useMutation({
        mutationFn: (data: RevertAppealInput) =>
            apiFetch(`/registrar/appeals/${id}/revert`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                // queryKey: ['appeals', 'registrar'],
                queryKey: queryKeys.registrarAppeals,
            });

            // toast success message - add later
            toast.success('Appeal reverted to appellant.');
            router.push('/registrar');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail>({
        // queryKey: ['appeal', 'registrar', id],
        queryKey: queryKeys.registrarAppeal(id),
        queryFn: () => apiFetch(`/registrar/appeals/${id}`),
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
                <CardContent className="pt-6">Loading ...</CardContent>
            </Card>
        );
    }

    if (!appeal) {
        return (
            <Card>
                <CardContent>Appeal not found</CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <AppealHeader id={appeal.id} status={appeal.status} />
                <CardContent className="space-y-6">
                    {/* appeal detail */}
                    <AppealDetailComponent appeal={appeal} />
                </CardContent>
            </Card>

            {/* appeal revert */}
            <RevertAppealCard
                form={revertForm}
                revertAppealMutation={revertAppealMutation}
            />

            {/* appeal checklist */}
            {!appeal.appealChecklist && (
                <ChecklistCard
                    form={checklistForm}
                    appeal={appeal}
                    createChecklistMutation={createChecklistMutation}
                />
            )}

            {/* appeal hearing */}
            {appeal.appealChecklist && (
                <HearingCard
                    form={hearingForm}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    sendToHearingMutation={sendToHearingMutation}
                />
            )}
        </>
    );
}

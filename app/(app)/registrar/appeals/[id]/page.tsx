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
import AppealDescriptionCard from './AppealDescriptionCard';
import RevertAppealCard from './RevertAppealCard';
import ChecklistCard from './ChecklistCard';
import HearingCard from './HearingCard';
import {
    checklistSchema,
    CreateChecklistInput,
    hearingSchema,
    RevertAppealFormInput,
    RevertAppealInput,
    revertSchema,
    SendToHearingInput,
} from './schemas';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

type AppealDetail = {
    id: number;
    description: string;
    appealChecklist: {
        complaintNumber: string;
        sectionNumber: string;
    } | null;
};

export default function RegistrarAppealDetailPage(props: Props) {
    const { id } = use(props.params);
    const router = useRouter();
    const queryClient = useQueryClient();

    const checklistForm = useForm<CreateChecklistInput>({
        resolver: zodResolver(checklistSchema),
        // mode: 'onChange',
        defaultValues: {
            complaintNumber: '',
            sectionNumber: '',
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

    const createChecklistMutation = useMutation({
        mutationFn: (data: CreateChecklistInput) =>
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
            router.push('/registrar');
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
    } = useQuery<AppealDetail | null>({
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
            {/* appeal description */}
            <AppealDescriptionCard
                id={appeal.id}
                description={appeal.description}
            />

            {/* appeal revert */}
            <RevertAppealCard
                form={revertForm}
                revertAppealMutation={revertAppealMutation}
            />

            {/* appeal checklist */}
            {!appeal.appealChecklist && (
                <ChecklistCard
                    form={checklistForm}
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

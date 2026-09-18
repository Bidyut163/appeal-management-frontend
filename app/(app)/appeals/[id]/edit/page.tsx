'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FieldGroup } from '@/components/ui/field';

import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
// import { createAppealFormData } from '../../file/createAppealFormData';
import { ResubmitFormInput, resubmitAppealSchema } from '../../file/schemas';
import { AppellantSection } from '@/components/appeals/form/AppellantSection';
import RespondentSection from '@/components/appeals/form/RespondentSection';
import { AppealDetailsSection } from '@/components/appeals/form/AppealDetailsSection';
import { use, useEffect } from 'react';
import { AppealDetail, AppealRevert } from '@/types/appeal';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditPage(props: Props) {
    const { id } = use(props.params);

    const router = useRouter();
    const queryClient = useQueryClient();

    const submitAppeal = (data: ResubmitFormInput) => {
        // const formData = createAppealFormData(data);

        return apiFetch(`/appeals/${id}/resubmit`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    };

    const updateAppealMutation = useMutation({
        mutationFn: (data: ResubmitFormInput) => submitAppeal(data),

        onSuccess: async () => {
            // await queryClient.invalidateQueries({
            //     queryKey: queryKeys.appeals,
            // });

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.appeals,
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.appeal(id),
                    exact: true,
                }),
            ]);

            toast.success('Appeal resubmitted successfully.');
            router.push(`/appeals/${id}`);
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const form = useForm<ResubmitFormInput>({
        resolver: zodResolver(resubmitAppealSchema),
        defaultValues: {
            // ============Appellant========
            appellantName: '',

            appellantResidentialAddressLine1: '',
            appellantResidentialAddressLine2: '',
            appellantResidentialLandmark: '',
            appellantResidentialCity: '',
            appellantResidentialDistrict: '',
            appellantResidentialState: '',
            appellantResidentialCountry: 'India',
            appellantResidentialPinCode: '',

            appellantServiceAddressLine1: '',
            appellantServiceAddressLine2: '',
            appellantServiceLandmark: '',
            appellantServiceCity: '',
            appellantServiceDistrict: '',
            appellantServiceState: '',
            appellantServiceCountry: 'India',
            appellantServicePinCode: '',

            appellantMobileNumber: '',
            appellantEmailAddress: '',

            // ==========Respondent===========

            respondentName: '',

            respondentOfficeAddressLine1: '',
            respondentOfficeAddressLine2: '',
            respondentOfficeLandmark: '',
            respondentOfficeCity: '',
            respondentOfficeDistrict: '',
            respondentOfficeState: '',
            respondentOfficeCountry: 'India',
            respondentOfficePinCode: '',

            respondentServiceAddressLine1: '',
            respondentServiceAddressLine2: '',
            respondentServiceLandmark: '',
            respondentServiceCity: '',
            respondentServiceDistrict: '',
            respondentServiceState: '',
            respondentServiceCountry: 'India',
            respondentServicePinCode: '',

            respondentMobileNumber: '',
            respondentEmailAddress: '',

            // -----------------Appeal Details---------------
            projectRegistrationNumber: '',
            isFiledWithinLimitation: false,
            delayReason: '',
            factsOfCase: '',
            groundsOfAppeal: '',
            reliefSought: '',
            interimReliefRequested: '',
            isMatterPendingInCourt: false,

            // -----------------Appeal Documents--------------
            // appealDocument: undefined,
        },
    });

    async function onSubmit(data: ResubmitFormInput) {
        // console.log('Submitted');
        const payload = {
            ...data,
            appellantMobileNumber: `+91${data.appellantMobileNumber}`,
            respondentMobileNumber: `+91${data.respondentMobileNumber}`,
        };
        updateAppealMutation.mutate(payload);
    }

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail>({
        // queryKey: ['appeal', id],
        queryKey: queryKeys.appeal(id),
        queryFn: () => apiFetch(`/appeals/${id}`),
    });

    const {
        data: revert,
        isLoading: isRevertLoading,
        error: revertError,
    } = useQuery<AppealRevert>({
        queryKey: queryKeys.appealRevert(id),
        queryFn: () => apiFetch(`/appeals/${id}/revert`),
    });

    useEffect(() => {
        if (!appeal) return;

        form.reset({
            appellantName: appeal.appellantName,

            appellantResidentialAddressLine1:
                appeal.appellantResidentialAddressLine1,
            appellantResidentialAddressLine2:
                appeal.appellantResidentialAddressLine2 ?? '',
            appellantResidentialLandmark:
                appeal.appellantResidentialLandmark ?? '',
            appellantResidentialCity: appeal.appellantResidentialCity,
            appellantResidentialDistrict: appeal.appellantResidentialDistrict,
            appellantResidentialState: appeal.appellantResidentialState,
            appellantResidentialCountry: appeal.appellantResidentialCountry,
            appellantResidentialPinCode: appeal.appellantResidentialPinCode,

            appellantServiceAddressLine1: appeal.appellantServiceAddressLine1,
            appellantServiceAddressLine2:
                appeal.appellantServiceAddressLine2 ?? '',
            appellantServiceLandmark: appeal.appellantServiceLandmark ?? '',
            appellantServiceCity: appeal.appellantServiceCity,
            appellantServiceDistrict: appeal.appellantServiceDistrict,
            appellantServiceState: appeal.appellantServiceState,
            appellantServiceCountry: appeal.appellantServiceCountry,
            appellantServicePinCode: appeal.appellantServicePinCode,

            appellantMobileNumber: appeal.appellantMobileNumber.replace(
                /^\+91/,
                '',
            ),
            appellantEmailAddress: appeal.appellantEmailAddress,

            respondentName: appeal.respondentName,

            respondentOfficeAddressLine1: appeal.respondentOfficeAddressLine1,
            respondentOfficeAddressLine2:
                appeal.respondentOfficeAddressLine2 ?? '',
            respondentOfficeLandmark: appeal.respondentOfficeLandmark ?? '',
            respondentOfficeCity: appeal.respondentOfficeCity,
            respondentOfficeDistrict: appeal.respondentOfficeDistrict,
            respondentOfficeState: appeal.respondentOfficeState,
            respondentOfficeCountry: appeal.respondentOfficeCountry,
            respondentOfficePinCode: appeal.respondentOfficePinCode,

            respondentServiceAddressLine1: appeal.respondentServiceAddressLine1,
            respondentServiceAddressLine2:
                appeal.respondentServiceAddressLine2 ?? '',
            respondentServiceLandmark: appeal.respondentServiceLandmark ?? '',
            respondentServiceCity: appeal.respondentServiceCity,
            respondentServiceDistrict: appeal.respondentServiceDistrict,
            respondentServiceState: appeal.respondentServiceState,
            respondentServiceCountry: appeal.respondentServiceCountry,
            respondentServicePinCode: appeal.respondentServicePinCode,

            respondentMobileNumber: appeal.respondentMobileNumber.replace(
                /^\+91/,
                '',
            ),
            respondentEmailAddress: appeal.respondentEmailAddress,

            projectRegistrationNumber: appeal.projectRegistrationNumber ?? '',
            isFiledWithinLimitation: appeal.isFiledWithinLimitation,
            delayReason: appeal.delayReason ?? '',
            factsOfCase: appeal.factsOfCase,
            groundsOfAppeal: appeal.groundsOfAppeal,
            reliefSought: appeal.reliefSought,
            interimReliefRequested: appeal.interimReliefRequested ?? '',
            isMatterPendingInCourt: appeal.isMatterPendingInCourt,
        });
    }, [appeal, form]);

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

    if (revertError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load revert details</CardTitle>
                </CardHeader>
                <CardContent>{getErrorMessage(revertError)}</CardContent>
            </Card>
        );
    }

    if (isLoading || isRevertLoading) {
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

    if (!revert) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No active revert found</CardTitle>
                </CardHeader>
                <CardContent>
                    This appeal does not have an active revert request.
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 border-amber-200 bg-amber-50/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-900">
                        Action Required
                    </CardTitle>

                    <CardDescription className="text-amber-800">
                        The Registrar has returned this appeal for correction.
                        Please review the reason below, update the required
                        fields, and resubmit the appeal.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <p className="mb-1 text-sm font-semibold text-foreground">
                            Revert reason
                        </p>

                        <div className="rounded-md border bg-background p-3 text-sm">
                            {revert.reason}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-semibold text-foreground">
                            Fields requiring correction
                        </p>

                        <ul className="space-y-2">
                            {revert.fields.map((field: string) => (
                                <li
                                    key={field}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    <span>{field}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Edit Appeal</CardTitle>
                    <CardDescription>
                        Review and update the information before resubmitting
                        your appeal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FieldGroup>
                            <AppellantSection
                                form={form}
                                editableFields={revert.fields}
                            />
                            <RespondentSection
                                form={form}
                                editableFields={revert.fields}
                            />
                            <AppealDetailsSection
                                form={form}
                                editableFields={revert.fields}
                            />
                        </FieldGroup>
                        <Button
                            className="self-start"
                            type="submit"
                            disabled={updateAppealMutation.isPending}
                        >
                            Update & Resubmit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

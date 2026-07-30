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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

import { AppellantSection } from './AppellantSection';
import { FormInput, formSchema } from './schemas';
import RespondentSection from './RespondentSection';
import { AppealDetailsSection } from './AppealDetailsSection';
import { AppealDocumentSection } from './AppealDocumentSection';

export default function FilePage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const submitAppeal = (data: FormInput) => {
        const formData = new FormData();

        formData.append('appellantName', data.appellantName);
        //
        formData.append(
            'appellantResidentialAddressLine1',
            data.appellantResidentialAddressLine1,
        );
        formData.append(
            'appellantResidentialAddressLine2',
            data.appellantResidentialAddressLine2 ?? '',
        );
        formData.append(
            'appellantResidentialLandmark',
            data.appellantResidentialLandmark ?? '',
        );
        formData.append(
            'appellantResidentialCity',
            data.appellantResidentialCity,
        );
        formData.append(
            'appellantResidentialDistrict',
            data.appellantResidentialDistrict,
        );
        formData.append(
            'appellantResidentialState',
            data.appellantResidentialState,
        );
        formData.append(
            'appellantResidentialCountry',
            data.appellantResidentialCountry,
        );
        formData.append(
            'appellantResidentialPinCode',
            data.appellantResidentialPinCode,
        );
        //
        formData.append(
            'appellantServiceAddressLine1',
            data.appellantServiceAddressLine1,
        );
        formData.append(
            'appellantServiceAddressLine2',
            data.appellantServiceAddressLine2 ?? '',
        );
        formData.append(
            'appellantServiceLandmark',
            data.appellantServiceLandmark ?? '',
        );
        formData.append('appellantServiceCity', data.appellantServiceCity);
        formData.append(
            'appellantServiceDistrict',
            data.appellantServiceDistrict,
        );
        formData.append('appellantServiceState', data.appellantServiceState);
        formData.append(
            'appellantServiceCountry',
            data.appellantServiceCountry,
        );
        formData.append(
            'appellantServicePinCode',
            data.appellantServicePinCode,
        );
        //
        formData.append('appellantMobileNumber', data.appellantMobileNumber);
        formData.append('appellantEmailAddress', data.appellantEmailAddress);
        //
        formData.append('respondentName', data.respondentName);
        //
        formData.append(
            'respondentOfficeAddressLine1',
            data.respondentOfficeAddressLine1,
        );
        formData.append(
            'respondentOfficeAddressLine2',
            data.respondentOfficeAddressLine2 ?? '',
        );
        formData.append(
            'respondentOfficeLandmark',
            data.respondentOfficeLandmark ?? '',
        );
        formData.append('respondentOfficeCity', data.respondentOfficeCity);
        formData.append(
            'respondentOfficeDistrict',
            data.respondentOfficeDistrict,
        );
        formData.append('respondentOfficeState', data.respondentOfficeState);
        formData.append(
            'respondentOfficeCountry',
            data.respondentOfficeCountry,
        );
        formData.append(
            'respondentOfficePinCode',
            data.respondentOfficePinCode,
        );
        //
        formData.append(
            'respondentServiceAddressLine1',
            data.respondentServiceAddressLine1,
        );
        formData.append(
            'respondentServiceAddressLine2',
            data.respondentServiceAddressLine2 ?? '',
        );
        formData.append(
            'respondentServiceLandmark',
            data.respondentServiceLandmark ?? '',
        );
        formData.append('respondentServiceCity', data.respondentServiceCity);
        formData.append(
            'respondentServiceDistrict',
            data.respondentServiceDistrict,
        );
        formData.append('respondentServiceState', data.respondentServiceState);
        formData.append(
            'respondentServiceCountry',
            data.respondentServiceCountry,
        );
        formData.append(
            'respondentServicePinCode',
            data.respondentServicePinCode,
        );
        //
        formData.append('respondentMobileNumber', data.respondentMobileNumber);
        formData.append('respondentEmailAddress', data.respondentEmailAddress);
        //
        formData.append(
            'projectRegistrationNumber',
            data.projectRegistrationNumber ?? '',
        );
        formData.append(
            'isFiledWithinLimitation',
            String(data.isFiledWithinLimitation),
        );
        formData.append('delayReason', data.delayReason ?? '');
        formData.append('factsOfCase', data.factsOfCase);
        formData.append('groundsOfAppeal', data.groundsOfAppeal);
        formData.append('reliefSought', data.reliefSought);
        formData.append(
            'interimReliefRequested',
            data.interimReliefRequested ?? '',
        );
        formData.append(
            'isMatterPendingInCourt',
            String(data.isMatterPendingInCourt),
        );

        // Object.entries(data).forEach(([key, value]) => {
        //     if (key === 'appealDocument') return;

        //     formData.append(key, String(value ?? ''));
        // });

        // ----------------------------------------------------------
        formData.append('appealDocument', data.appealDocument);

        return apiFetch('/appeals', {
            method: 'POST',
            body: formData,
        });
    };

    const createAppealMutation = useMutation({
        mutationFn: (data: FormInput) => submitAppeal(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.appeals,
            });

            toast.success('Appeal filed successfully.');
            router.push('/appeals');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const form = useForm<FormInput>({
        resolver: zodResolver(formSchema),
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
            appealDocument: undefined,
        },
    });

    async function onSubmit(data: FormInput) {
        const payload = {
            ...data,
            appellantMobileNumber: `+91${data.appellantMobileNumber}`,
            respondentMobileNumber: `+91${data.respondentMobileNumber}`,
        };
        createAppealMutation.mutate(payload);
    }

    return (
        <Card className="max-w-3xl">
            <CardHeader>
                <CardTitle>File Appeal(Form C)</CardTitle>
                <CardDescription>
                    Fill out the following form C to registar an appeal
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FieldGroup>
                        <AppellantSection form={form} />
                        <RespondentSection form={form} />
                        <AppealDetailsSection form={form} />
                        <AppealDocumentSection form={form} />
                    </FieldGroup>
                    <Button
                        className="self-start"
                        type="submit"
                        disabled={createAppealMutation.isPending}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

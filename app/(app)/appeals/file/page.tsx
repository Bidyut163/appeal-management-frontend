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

import { AppellantSection } from '@/components/appeals/form/AppellantSection';
import { FormInput, formSchema } from './schemas';
import RespondentSection from '@/components/appeals/form/RespondentSection';
import { AppealDetailsSection } from '@/components/appeals/form/AppealDetailsSection';
import { AppealDocumentSection } from '@/components/appeals/form/AppealDocumentSection';
import { createAppealFormData } from './createAppealFormData';

export default function FilePage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const submitAppeal = (data: FormInput) => {
        const formData = createAppealFormData(data);

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

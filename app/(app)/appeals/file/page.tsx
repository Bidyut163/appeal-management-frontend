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
import { useMutation } from '@tanstack/react-query';

import { AppellantSection } from '@/components/appeals/form/AppellantSection';
import { FormInput, formSchema } from './schemas';
import RespondentSection from '@/components/appeals/form/RespondentSection';
import { AppealDetailsSection } from '@/components/appeals/form/AppealDetailsSection';
import { AppealDocumentSection } from '@/components/appeals/form/AppealDocumentSection';
import { createAppealFormData } from './createAppealFormData';
import { AppealDetail } from '@/types/appeal';

export default function FilePage() {
    const router = useRouter();

    const submitAppeal = (data: FormInput) => {
        const formData = createAppealFormData(data);

        return apiFetch('/appeals', {
            method: 'POST',
            body: formData,
        });
    };

    const createAppealMutation = useMutation<AppealDetail, Error, FormInput>({
        mutationFn: (data: FormInput) => submitAppeal(data),

        onSuccess: async (appeal) => {
            toast.success('Appeal filed successfully.');
            router.push(`/appeals/${appeal.id}/payment`);
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
        <div className="mx-auto w-full max-w-6xl space-y-6">
            {/* Page heading */}
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                    File an Appeal
                </h1>
                <p className="text-sm text-muted-foreground">
                    Complete Form C to submit your appeal to the Assam Real
                    Estate Appellate Tribunal.
                </p>
            </div>

            {/* Form container */}
            <Card className="overflow-hidden rounded-xl border shadow-sm">
                <CardHeader className="space-y-2 border-b bg-muted/20 px-6 py-5 md:px-8">
                    <CardTitle className="text-xl">
                        Form C — Application for Appeal
                    </CardTitle>
                    <CardDescription>
                        Please provide the required particulars and supporting
                        information below.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-6 py-8 md:px-8">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <FieldGroup className="gap-8">
                            <AppellantSection form={form} />
                            <RespondentSection form={form} />
                            <AppealDetailsSection form={form} />
                            <AppealDocumentSection form={form} />
                        </FieldGroup>

                        <div className="flex justify-end border-t pt-6">
                            <Button
                                className="min-w-36"
                                type="submit"
                                disabled={createAppealMutation.isPending}
                            >
                                {createAppealMutation.isPending
                                    ? 'Submitting...'
                                    : 'Submit Appeal'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

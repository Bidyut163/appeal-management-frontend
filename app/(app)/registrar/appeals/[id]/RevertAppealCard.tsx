import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import { RevertAppealFormInput, RevertAppealInput } from './schemas';
import { UseMutationResult } from '@tanstack/react-query';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

type RevertAppealResponse = {
    id: number;
    appealId: number;
    reason: string;
    fields: string[];
    status: 'OPEN' | 'RESUBMITTED';
    createdById: number;
    createdAt: string;
    updatedAt: string;
};

interface RevertAppealCardProps {
    form: UseFormReturn<RevertAppealFormInput>;
    revertAppealMutation: UseMutationResult<
        RevertAppealResponse,
        Error,
        RevertAppealInput
    >;
}

const REVERTABLE_FIELDS = [
    {
        name: 'appellantName',
        label: 'Name of the Appellant',
    },
    {
        name: 'appellantResidentialAddressLine1',
        label: 'Appellant Residential Address - Line 1',
    },
    {
        name: 'appellantResidentialAddressLine2',
        label: 'Appellant Residential Address - Line 2',
    },
    {
        name: 'appellantResidentialLandmark',
        label: 'Appellant Residential Landmark',
    },
    {
        name: 'appellantResidentialCity',
        label: 'Appellant Residential City',
    },
    {
        name: 'appellantResidentialDistrict',
        label: 'Appellant Residential District',
    },
    {
        name: 'appellantResidentialState',
        label: 'Appellant Residential State',
    },
    {
        name: 'appellantResidentialCountry',
        label: 'Appellant Residential Country',
    },
    {
        name: 'appellantResidentialPinCode',
        label: 'Appellant Residential PIN Code',
    },
    {
        name: 'appellantServiceAddressLine1',
        label: 'Appellant Service Address - Line 1',
    },
    {
        name: 'appellantServiceAddressLine2',
        label: 'Appellant Service Address - Line 2',
    },
    {
        name: 'appellantServiceLandmark',
        label: 'Appellant Service Landmark',
    },
    {
        name: 'appellantServiceCity',
        label: 'Appellant Service City',
    },
    {
        name: 'appellantServiceDistrict',
        label: 'Appellant Service District',
    },
    {
        name: 'appellantServiceState',
        label: 'Appellant Service State',
    },
    {
        name: 'appellantServiceCountry',
        label: 'Appellant Service Country',
    },
    {
        name: 'appellantServicePinCode',
        label: 'Appellant Service PIN Code',
    },
    {
        name: 'appellantMobileNumber',
        label: 'Appellant Mobile Number',
    },
    {
        name: 'appellantEmailAddress',
        label: 'Appellant Email Address',
    },
    {
        name: 'respondentName',
        label: 'Name of the Respondent',
    },
    {
        name: 'respondentOfficeAddressLine1',
        label: 'Respondent Office Address - Line 1',
    },
    {
        name: 'respondentOfficeAddressLine2',
        label: 'Respondent Office Address - Line 2',
    },
    {
        name: 'respondentOfficeLandmark',
        label: 'Respondent Office Landmark',
    },
    {
        name: 'respondentOfficeCity',
        label: 'Respondent Office City',
    },
    {
        name: 'respondentOfficeDistrict',
        label: 'Respondent Office District',
    },
    {
        name: 'respondentOfficeState',
        label: 'Respondent Office State',
    },
    {
        name: 'respondentOfficeCountry',
        label: 'Respondent Office Country',
    },
    {
        name: 'respondentOfficePinCode',
        label: 'Respondent Office PIN Code',
    },
    {
        name: 'respondentServiceAddressLine1',
        label: 'Respondent Service Address - Line 1',
    },
    {
        name: 'respondentServiceAddressLine2',
        label: 'Respondent Service Address - Line 2',
    },
    {
        name: 'respondentServiceLandmark',
        label: 'Respondent Service Landmark',
    },
    {
        name: 'respondentServiceCity',
        label: 'Respondent Service City',
    },
    {
        name: 'respondentServiceDistrict',
        label: 'Respondent Service District',
    },
    {
        name: 'respondentServiceState',
        label: 'Respondent Service State',
    },
    {
        name: 'respondentServiceCountry',
        label: 'Respondent Service Country',
    },
    {
        name: 'respondentServicePinCode',
        label: 'Respondent Service PIN Code',
    },
    {
        name: 'respondentMobileNumber',
        label: 'Respondent Mobile Number',
    },
    {
        name: 'respondentEmailAddress',
        label: 'Respondent Email Address',
    },
    {
        name: 'projectRegistrationNumber',
        label: 'Project Registration Number',
    },
    {
        name: 'isFiledWithinLimitation',
        label: 'Filed Within Limitation Period',
    },
    {
        name: 'delayReason',
        label: 'Delay Reason',
    },
    {
        name: 'factsOfCase',
        label: 'Facts of the Case',
    },
    {
        name: 'groundsOfAppeal',
        label: 'Grounds of Appeal',
    },
    {
        name: 'reliefSought',
        label: 'Relief Sought',
    },
    {
        name: 'interimReliefRequested',
        label: 'Interim Relief Requested',
    },
    {
        name: 'isMatterPendingInCourt',
        label: 'Matter Pending in Court',
    },
] as const;

export default function RevertAppealCard({
    form,
    revertAppealMutation,
}: RevertAppealCardProps) {
    const [revertableField, setRevertableField] = useState('');

    const handleSubmitRevert = (data: RevertAppealFormInput) => {
        const payload: RevertAppealInput = {
            revertReason: data.revertReason,
            fields: data.fields.map((field) => field.name),
        };
        revertAppealMutation.mutate(payload);
    };

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields',
    });

    const MAX_REVERT_FIELDS = 5;
    const handleAddField = () => {
        const selected = REVERTABLE_FIELDS.find(
            (field) => field.name === revertableField,
        );

        if (!selected) return;

        if (fields.length >= MAX_REVERT_FIELDS) {
            toast.error(`You can select up to ${MAX_REVERT_FIELDS} fields.`);
            return;
        }

        if (fields.some((field) => field.name === selected.name)) {
            toast.error('This field has already been selected.');
            return;
        }

        append({
            name: selected.name,
            label: selected.label,
        });
        setRevertableField('');
    };

    return (
        <Card className="mt-4 max-w-4xl">
            <CardHeader>
                <CardTitle>Revert back to appellant</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <form
                        id="revert-back-form"
                        // onSubmit={form.handleSubmit(onRevert)}
                        onSubmit={form.handleSubmit(handleSubmitRevert)}
                    >
                        <DialogTrigger asChild>
                            <Button>Revert back to appellant</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>
                                    Revert back to appellant?
                                </DialogTitle>
                                <DialogDescription>
                                    Please add a reason and respective fields
                                    before revert.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Controller
                                    name="revertReason"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="revertReason">
                                                Revert Reason
                                            </FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="revertReason"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Revert reason"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Field
                                    data-invalid={
                                        !!form.formState.errors.fields
                                    }
                                >
                                    <FieldLabel htmlFor="revert-field">
                                        Fields requiring correction
                                    </FieldLabel>

                                    <div className="flex gap-2">
                                        <Select
                                            value={revertableField}
                                            onValueChange={setRevertableField}
                                        >
                                            <SelectTrigger
                                                id="revert-field"
                                                className="flex-1"
                                            >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="item-aligned">
                                                {REVERTABLE_FIELDS.map(
                                                    (item) => (
                                                        <SelectItem
                                                            key={item.name}
                                                            value={item.name}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={handleAddField}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {fields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="flex items-center justify-between rounded-md border p-2"
                                            >
                                                <span>{field.label}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    {form.formState.errors.fields && (
                                        <FieldError
                                            errors={[
                                                form.formState.errors.fields,
                                            ]}
                                        />
                                    )}
                                </Field>
                            </FieldGroup>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    form="revert-back-form"
                                    // disabled={form.formState.isSubmitting}
                                    disabled={revertAppealMutation.isPending}
                                >
                                    Revert back to appellant
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </CardContent>
        </Card>
    );
}

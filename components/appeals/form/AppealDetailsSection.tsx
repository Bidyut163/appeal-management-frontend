import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from '@/components/ui/field';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormInput } from '@/app/(app)/appeals/file/schemas';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

interface AppealDetailsSectionProps {
    form: UseFormReturn<FormInput>;
    editableFields?: string[];
}

const options = [
    {
        id: 'not-pending',
        title: 'Not pending',
    },
    {
        id: 'pending',
        title: 'Pending',
    },
] as const;

function FormSectionHeading({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description?: string;
}) {
    return (
        <div className="space-y-1 border-b pb-4">
            <h3 className="text-base font-semibold tracking-tight">
                {number}. {title}
            </h3>

            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}

export const AppealDetailsSection = ({
    form,
    editableFields,
}: AppealDetailsSectionProps) => {
    const isFiledWithinLimitation = form.watch('isFiledWithinLimitation');

    const isFieldEditable = (field: string) =>
        editableFields?.includes(field) || !editableFields;

    useEffect(() => {
        if (isFiledWithinLimitation) {
            form.setValue('delayReason', '');
        }
    }, [isFiledWithinLimitation, form]);

    return (
        <>
            <FormSectionHeading
                number={3}
                title="Jurisdiction of the Appellate Tribunal"
                description="The appellant declares that the subject matter of the appeal
                falls within the jurisdiction of the Appellate Tribunal"
            />

            <Controller
                name="projectRegistrationNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="projectRegistrationNumber">
                            Project Registration Number
                        </FieldLabel>

                        <Input
                            {...field}
                            id="projectRegistrationNumber"
                            aria-invalid={fieldState.invalid}
                            placeholder="Project Registration Number"
                            disabled={
                                !isFieldEditable('projectRegistrationNumber')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading number={4} title="Limitation" />

            <Controller
                name="isFiledWithinLimitation"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div>
                        <FieldGroup data-slot="checkbox-group">
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="isFiledWithinLimitation"
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={
                                        !isFieldEditable(
                                            'isFiledWithinLimitation',
                                        )
                                    }
                                />
                                <FieldLabel
                                    htmlFor="isFiledWithinLimitation"
                                    className="font-normal"
                                >
                                    The appellant declares that the appeal is
                                    within the limitation specified in
                                    sub-section (2) of section 44
                                </FieldLabel>
                            </Field>
                        </FieldGroup>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </div>
                )}
            />

            <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1" />
                <span className="text-xs font-medium text-muted-foreground">
                    OR
                </span>
                <Separator className="flex-1" />
            </div>

            <Controller
                name="delayReason"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="delayReason">
                            If the appeal is filed after the expiry of the
                            limitation period specified under sub-section (2) of
                            section 44, specify reasons for delay.
                        </FieldLabel>

                        <Textarea
                            {...field}
                            id="delayReason"
                            aria-invalid={fieldState.invalid}
                            placeholder="Reasons for delay"
                            className="min-h-32 resize-y"
                            disabled={
                                isFiledWithinLimitation ||
                                !isFieldEditable('delayReason')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading number={5} title="Facts of the case" />

            <Controller
                name="factsOfCase"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="factsOfCase">
                            Give concise statement of facts and grounds of
                            appeal against the specific order of the Authority
                            or the Adjudicating Officer, as the case may be
                            passed under.
                        </FieldLabel>

                        <Textarea
                            {...field}
                            id="factsOfCase"
                            aria-invalid={fieldState.invalid}
                            placeholder="Facts of case"
                            className="min-h-32 resize-y"
                            disabled={!isFieldEditable('factsOfCase')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading number={6} title="Grounds of Appeal" />

            <Controller
                name="groundsOfAppeal"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="groundsOfAppeal">
                            Please Specify the grounds of the Appeal.
                        </FieldLabel>

                        <Textarea
                            {...field}
                            id="groundsOfAppeal"
                            aria-invalid={fieldState.invalid}
                            placeholder="Grounds of appeal"
                            className="min-h-32 resize-y"
                            disabled={!isFieldEditable('groundsOfAppeal')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading number={7} title="Relief(s) sought" />

            <Controller
                name="reliefSought"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="reliefSought">
                            Specify the relief(s) sought explaining the grounds
                            of relief(s) and the legal provisions(if any) relied
                            upon.
                        </FieldLabel>

                        <Textarea
                            {...field}
                            id="reliefSought"
                            aria-invalid={fieldState.invalid}
                            placeholder="Relief sought"
                            className="min-h-32 resize-y"
                            disabled={!isFieldEditable('reliefSought')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading
                number={8}
                title="Interim order, if prayed for"
            />

            <Controller
                name="interimReliefRequested"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="interimReliefRequested">
                            Pending final decision on the appeal, the appellant
                            seeks issue of the following interim order: [Give
                            here the nature of the interim order prayed for with
                            reasons]
                        </FieldLabel>

                        <Textarea
                            {...field}
                            id="interimReliefRequested"
                            aria-invalid={fieldState.invalid}
                            placeholder="Interim order if requested"
                            className="min-h-32 resize-y"
                            disabled={
                                !isFieldEditable('interimReliefRequested')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <FormSectionHeading
                number={9}
                title="Matter not pending with any other court, etc:"
            />

            <Controller
                name="isMatterPendingInCourt"
                control={form.control}
                render={({ field, fieldState }) => (
                    <FieldSet>
                        <FieldDescription>
                            The appellant further declares that the matter
                            regarding which this appeal has been made, is
                            pending/not pending before any court of law or any
                            other authority or any other Tribunal(s).
                        </FieldDescription>
                        <RadioGroup
                            name={field.name}
                            value={field.value ? 'pending' : 'not-pending'}
                            onValueChange={(value) => {
                                field.onChange(value === 'pending');
                            }}
                            disabled={
                                !isFieldEditable('isMatterPendingInCourt')
                            }
                        >
                            {options.map((option) => (
                                <FieldLabel
                                    key={option.id}
                                    htmlFor={`isMatterPendingInCourt-${option.id}`}
                                >
                                    <Field
                                        orientation="horizontal"
                                        data-invalid={fieldState.invalid}
                                    >
                                        <FieldContent>
                                            <FieldTitle>
                                                {option.title}
                                            </FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem
                                            value={option.id}
                                            id={`isMatterPendingInCourt-${option.id}`}
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </Field>
                                </FieldLabel>
                            ))}
                        </RadioGroup>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldSet>
                )}
            />
        </>
    );
};

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

export const AppealDetailsSection = ({ form }: AppealDetailsSectionProps) => {
    const isFiledWithinLimitation = form.watch('isFiledWithinLimitation');

    useEffect(() => {
        if (isFiledWithinLimitation) {
            form.setValue('delayReason', '');
        }
    }, [isFiledWithinLimitation, form]);

    return (
        <>
            <hr />
            <h6>3. Jurisdiction of the Appellate Tribunal</h6>
            <p>
                The appellant declares that the subject matter of the appeal
                falls within the jurisdiction of the Appellate Tribunal
            </p>

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
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <h6>4. Limitation</h6>

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

            <Separator />
            <div className="text-center">OR</div>
            <Separator />

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
                            className="min-h-30"
                            disabled={isFiledWithinLimitation}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <h6>5. Facts of the case</h6>

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
                            className="min-h-30"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <h6>6. Grounds of Appeal</h6>

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
                            className="min-h-30"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <h6>7. Relief(s) sought</h6>

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
                            className="min-h-30"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <h6>8. Interim order, if prayed for</h6>

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
                            className="min-h-30"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <h6>9. Matter not pending with any other court, etc:</h6>

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

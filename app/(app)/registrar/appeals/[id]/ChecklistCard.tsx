import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateChecklistInput } from './schemas';
import { UseMutationResult } from '@tanstack/react-query';

interface ChecklistCardProps {
    form: UseFormReturn<CreateChecklistInput>;
    createChecklistMutation: UseMutationResult<
        CreateChecklistInput,
        Error,
        CreateChecklistInput
    >;
}

export default function ChecklistCard({
    form,
    createChecklistMutation,
}: ChecklistCardProps) {
    const handleSubmitChecklist = (data: CreateChecklistInput) => {
        createChecklistMutation.mutate(data);
    };

    return (
        <Card className="mt-4 max-w-4xl">
            <CardHeader>
                <CardTitle>Checklist</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="checklist-form"
                    className="flex flex-col gap-4"
                    // onSubmit={form.handleSubmit(onSubmit)}
                    onSubmit={form.handleSubmit(handleSubmitChecklist)}
                >
                    <FieldGroup>
                        <Controller
                            name="complaintNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="complaintNumber">
                                        Complaint Number
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        {...field}
                                        id="complaintNumber"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Complaint Number"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="sectionNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="sectionNumber">
                                        Section Number
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        {...field}
                                        id="sectionNumber"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Section Number"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button
                        type="submit"
                        form="checklist-form"
                        // disabled={form.formState.isSubmitting}
                        disabled={createChecklistMutation.isPending}
                        className="self-start"
                    >
                        Submit checklist
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

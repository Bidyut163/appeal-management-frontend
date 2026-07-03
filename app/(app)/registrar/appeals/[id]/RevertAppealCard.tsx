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

import { Controller, UseFormReturn } from 'react-hook-form';
import { RevertAppealInput } from './schemas';
import { UseMutationResult } from '@tanstack/react-query';

interface RevertAppealCardProps {
    form: UseFormReturn<RevertAppealInput>;
    revertAppealMutation: UseMutationResult<
        RevertAppealInput,
        Error,
        RevertAppealInput
    >;
}

export default function RevertAppealCard({
    form,
    revertAppealMutation,
}: RevertAppealCardProps) {
    const handleSubmitRevert = (data: RevertAppealInput) => {
        revertAppealMutation.mutate(data);
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
                                    Please add a comment before revert.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Controller
                                    name="registrarComment"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="registrarComment">
                                                Registrar Comment
                                            </FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="registrarComment"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Registrar comment"
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

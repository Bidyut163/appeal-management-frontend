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

import { UseMutationResult } from '@tanstack/react-query';
import { DisposeAppealInput } from './schemas';
import { AppealDetail } from '@/types/appeal';

interface DisposeAppealCardProps {
    form: UseFormReturn<DisposeAppealInput>;
    disposeAppealMutation: UseMutationResult<
        AppealDetail,
        Error,
        DisposeAppealInput
    >;
}

export default function DisposeAppealCard({
    form,
    disposeAppealMutation,
}: DisposeAppealCardProps) {
    const handleSubmit = (data: DisposeAppealInput) => {
        disposeAppealMutation.mutate(data);
    };

    return (
        <Card className="mt-4 max-w-4xl">
            <CardHeader>
                <CardTitle>Dispose Appeal</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Dispose Appeal</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Dispose Appeal?</DialogTitle>
                            <DialogDescription>
                                Please enter the final decision comment before
                                disposing this appeal.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            id="dispose-appeal-form"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FieldGroup>
                                <Controller
                                    name="comment"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="comment">
                                                Decision comment
                                            </FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="comment"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="Decision comment"
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
                        </form>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                form="dispose-appeal-form"
                                disabled={disposeAppealMutation.isPending}
                            >
                                Dispose Appeal
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}

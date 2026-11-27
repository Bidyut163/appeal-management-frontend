import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Controller, UseFormReturn } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';

import { CalendarCheckIcon } from 'lucide-react';
import { SendToHearingInput, SendToHearingOutput } from './schemas';
import { UseMutationResult } from '@tanstack/react-query';

interface HearingCardProps {
    form: UseFormReturn<SendToHearingInput>;
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sendToHearingMutation: UseMutationResult<
        SendToHearingOutput,
        Error,
        SendToHearingInput
    >;
}

export default function HearingCard({
    form,
    isDialogOpen,
    setIsDialogOpen,
    sendToHearingMutation,
}: HearingCardProps) {
    const handleOpenConfirmation = async () => {
        const isValid = await form.trigger();

        if (isValid) {
            setIsDialogOpen(true);
        }
    };

    const handleSubmitHearing = (data: SendToHearingInput) => {
        sendToHearingMutation.mutate(data);
    };

    return (
        <Card className="mt-4 w-full">
            <CardHeader>
                <CardTitle>Send to hearing</CardTitle>

                <CardDescription>
                    Schedule a hearing for this appeal and provide any relevant
                    remarks.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="hearing-form" className="flex flex-col gap-5">
                    <FieldGroup>
                        <Controller
                            name="hearingDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="hearingDate">
                                        Date of hearing
                                    </FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="hearingDate"
                                                variant="outline"
                                                className="w-full justify-between font-normal"
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>Select date</span>
                                                )}
                                                <CalendarCheckIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                defaultMonth={field.value}
                                                fixedWeeks
                                                weekStartsOn={1}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="registrarComments"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="registrarComment">
                                        Registrar Comment
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="registrarComments"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Registrar comment"
                                        className="min-h-24 resize-y"
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

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <Button
                            type="button"
                            className="self-start"
                            onClick={handleOpenConfirmation}
                        >
                            Send to hearing
                        </Button>

                        <DialogContent>
                            <DialogTitle>
                                Are you sure you want to send this appeal to
                                hearing?
                            </DialogTitle>
                            <DialogDescription>
                                This action will send the appeal to hearing.
                            </DialogDescription>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    form="hearing-form"
                                    // onClick={form.handleSubmit(onHearingSubmit)}
                                    onClick={form.handleSubmit(
                                        handleSubmitHearing,
                                    )}
                                    // disabled={
                                    //     form.formState.isSubmitting
                                    // }
                                    disabled={sendToHearingMutation.isPending}
                                >
                                    Confirm & Send to hearing
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </form>
            </CardContent>
        </Card>
    );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { formatDate } from '@/utils/formatDate';
import { format } from 'date-fns';
import { CalendarCheckIcon, CircleCheckBig } from 'lucide-react';
import { Controller, UseFormReturn } from 'react-hook-form';

import type { Hearing } from '@/types/appeal';
import type { ScheduleNextHearingInput } from './schemas';

interface Props {
    hearings: Hearing[];
    completeHearing: (hearingId: number) => void;
    isCompletingHearing: boolean;
    form: UseFormReturn<ScheduleNextHearingInput>;
    scheduleNextHearing: (data: ScheduleNextHearingInput) => void;
    isSchedulingNextHearing: boolean;
}

function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

export const HearingHistory = (props: Props) => {
    const {
        hearings,
        completeHearing,
        isCompletingHearing,
        form,
        scheduleNextHearing,
        isSchedulingNextHearing,
    } = props;

    const currentHearing = hearings[hearings.length - 1];

    return (
        <section className="space-y-2 border-b pb-4">
            <h2 className="text-base font-semibold text-muted-foreground">
                Hearing History
            </h2>

            <div className="space-y-3">
                {hearings.map((hearing) => (
                    <div key={hearing.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">
                                    Hearing #{hearing.hearingNumber}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(hearing.hearingDate)}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 items-end">
                                <Badge>{formatStatus(hearing.status)}</Badge>
                                {hearing.id === currentHearing?.id &&
                                    currentHearing?.status === 'SCHEDULED' && (
                                        <Button
                                            disabled={isCompletingHearing}
                                            onClick={() =>
                                                completeHearing(
                                                    currentHearing.id,
                                                )
                                            }
                                            className="cursor-pointer"
                                        >
                                            <CircleCheckBig />{' '}
                                            {isCompletingHearing
                                                ? 'Completing...'
                                                : 'Complete Hearing'}
                                        </Button>
                                    )}
                                {hearing.id === currentHearing?.id &&
                                    currentHearing?.status === 'COMPLETED' && (
                                        <Dialog>
                                            <form
                                                id="scheduleNextHearing-form"
                                                onSubmit={form.handleSubmit(
                                                    scheduleNextHearing,
                                                )}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button>
                                                        Schedule Next Hearing
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-sm">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Schedule Next
                                                            Hearing!
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Please select next
                                                            hearing date.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <FieldGroup>
                                                        <Controller
                                                            name="hearingDate"
                                                            control={
                                                                form.control
                                                            }
                                                            render={({
                                                                field,
                                                                fieldState,
                                                            }) => (
                                                                <Field
                                                                    data-invalid={
                                                                        fieldState.invalid
                                                                    }
                                                                >
                                                                    <FieldLabel htmlFor="hearingDate">
                                                                        Date of
                                                                        hearing
                                                                    </FieldLabel>

                                                                    <Popover>
                                                                        <PopoverTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                id="hearingDate"
                                                                                variant="outline"
                                                                                className="justify-between font-normal pr-1"
                                                                            >
                                                                                {field.value ? (
                                                                                    format(
                                                                                        field.value,
                                                                                        'PPP',
                                                                                    )
                                                                                ) : (
                                                                                    <span>
                                                                                        Select
                                                                                        date
                                                                                    </span>
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
                                                                                selected={
                                                                                    field.value
                                                                                }
                                                                                onSelect={
                                                                                    field.onChange
                                                                                }
                                                                                defaultMonth={
                                                                                    field.value
                                                                                }
                                                                                fixedWeeks
                                                                                weekStartsOn={
                                                                                    1
                                                                                }
                                                                                captionLayout="dropdown"
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                    {fieldState.invalid && (
                                                                        <FieldError
                                                                            errors={[
                                                                                fieldState.error,
                                                                            ]}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            )}
                                                        />
                                                    </FieldGroup>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button
                                                            type="submit"
                                                            form="scheduleNextHearing-form"
                                                            // disabled={form.formState.isSubmitting}
                                                            disabled={
                                                                isSchedulingNextHearing
                                                            }
                                                        >
                                                            Schedule Next
                                                            Hearing
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

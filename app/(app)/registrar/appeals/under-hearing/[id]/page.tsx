'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { AppealDetail, AppealStatus } from '@/types/appeal';
import { formatDate } from '@/utils/formatDate';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarCheckIcon, CircleCheckBig } from 'lucide-react';

// import { DownloadIcon } from 'lucide-react';
import { use } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex gap-8 py-3 border-b last:border-none">
            <span className="w-50 text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

// function getPaymentVariant(
//     status: Appeal['payment_status'],
// ): 'success' | 'pending' | 'failed' {
//     switch (status) {
//         case 'success':
//             return 'success';
//         case 'pending':
//             return 'pending';
//         case 'failed':
//             return 'failed';
//         default:
//             return 'pending';
//     }
// }

function getAppealStatusVariant(
    status: AppealStatus,
): 'success' | 'pending' | 'default' | 'failed' {
    switch (status) {
        case 'DRAFT':
            return 'pending';
        case 'UNDER_VERIFICATION':
            return 'default';
        case 'WITH_REGISTRAR':
            return 'default';
        case 'REVERTED_TO_APPELLANT':
            return 'default';
        case 'UNDER_HEARING':
            return 'success';
        case 'DISPOSED':
            return 'success';
        case 'REJECTED':
            return 'failed';
        default:
            return 'pending';
    }
}

function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

const scheduleNextHearingSchema = z.object({
    hearingDate: z.date({
        error: 'Hearing date is required',
    }),
});

type ScheduleNextHearingInput = z.infer<typeof scheduleNextHearingSchema>;

export default function AppealUnderHearingPage(props: Props) {
    const { id } = use(props.params);
    const queryClient = useQueryClient();

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail | null>({
        queryKey: queryKeys.hearingAppeal(id),
        queryFn: () => apiFetch(`/registrar/appeals/under-hearing/${id}`),
    });

    const completeHearingMutation = useMutation({
        mutationFn: (data: { hearingId: number }) =>
            apiFetch(
                `/registrar/appeals/${id}/hearings/${data.hearingId}/complete`,
                {
                    method: 'PATCH',
                },
            ),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeal(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeals,
                }),
            ]);
            toast.success('Current hearing is completed.');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const scheduleNextHearingMutation = useMutation({
        mutationFn: (data: ScheduleNextHearingInput) =>
            apiFetch(`/registrar/appeals/${id}/schedule-next-hearing`, {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeal(id),
                }),
                queryClient.invalidateQueries({
                    queryKey: queryKeys.hearingAppeals,
                }),
            ]);
            toast.success('Next hearing is scheduled!');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const form = useForm<ScheduleNextHearingInput>({
        resolver: zodResolver(scheduleNextHearingSchema),
        mode: 'onChange',
        defaultValues: {
            hearingDate: undefined,
        },
    });

    const scheduleNextHearingSubmit = (data: ScheduleNextHearingInput) => {
        scheduleNextHearingMutation.mutate(data);
    };

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load appeal</CardTitle>
                </CardHeader>
                <CardContent>{getErrorMessage(error)}</CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent>Loading ...</CardContent>
            </Card>
        );
    }

    if (!appeal) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Appeal not found</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    const currentHearing = appeal.hearings[appeal.hearings.length - 1];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Appeal #{appeal.id}
                        </h1>
                        <div className="mt-1 flex gap-2 items-center">
                            <span className="text-sm text-muted-foreground">
                                Status:
                            </span>
                            <Badge
                                variant={getAppealStatusVariant(appeal.status)}
                            >
                                {formatStatus(appeal.status)}
                            </Badge>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Hearing History */}
                <section className="space-y-2 border-b pb-4">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Hearing History
                    </h2>

                    <div className="space-y-3">
                        {appeal.hearings.map((hearing) => (
                            <div
                                key={hearing.id}
                                className="rounded-md border p-4"
                            >
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
                                        <Badge>
                                            {formatStatus(hearing.status)}
                                        </Badge>
                                        {currentHearing === hearing &&
                                            currentHearing?.status ===
                                                'SCHEDULED' && (
                                                <Button
                                                    disabled={
                                                        completeHearingMutation.isPending
                                                    }
                                                    onClick={() =>
                                                        completeHearingMutation.mutate(
                                                            {
                                                                hearingId:
                                                                    currentHearing.id,
                                                            },
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <CircleCheckBig />{' '}
                                                    {completeHearingMutation.isPending
                                                        ? 'Completing...'
                                                        : 'Complete Hearing'}
                                                </Button>
                                            )}
                                        {currentHearing === hearing &&
                                            currentHearing?.status ===
                                                'COMPLETED' && (
                                                <Dialog>
                                                    <form
                                                        id="scheduleNextHearing-form"
                                                        onSubmit={form.handleSubmit(
                                                            scheduleNextHearingSubmit,
                                                        )}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <Button>
                                                                Schedule Next
                                                                Hearing
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-sm">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Schedule
                                                                    Next
                                                                    Hearing!
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Please
                                                                    select next
                                                                    hearing
                                                                    date.
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
                                                                                Date
                                                                                of
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
                                                                <DialogClose
                                                                    asChild
                                                                >
                                                                    <Button variant="outline">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                                <Button
                                                                    type="submit"
                                                                    form="scheduleNextHearing-form"
                                                                    // disabled={form.formState.isSubmitting}
                                                                    disabled={
                                                                        scheduleNextHearingMutation.isPending
                                                                    }
                                                                >
                                                                    Schedule
                                                                    Next Hearing
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

                {/* Parties */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Parties
                    </h2>

                    <InfoRow
                        label="Appellant Name"
                        value={appeal.appellantName}
                    />
                    <InfoRow
                        label="Respondent Name"
                        value={appeal.respondentName}
                    />
                </section>

                {/* Appellant Address */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Appellant Address
                    </h2>

                    <InfoRow
                        label="Appellant Residential Address:"
                        value={appeal.appellantResidentialAddressLine1}
                    />
                    <InfoRow
                        label="Appellant Service Address:"
                        value={appeal.appellantServiceAddressLine1}
                    />
                </section>

                {/* Appellant Contact */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Appellant Contact
                    </h2>

                    <InfoRow
                        label="Mobile Number:"
                        value={appeal.appellantMobileNumber}
                    />
                    <InfoRow
                        label="Email Address:"
                        value={appeal.appellantEmailAddress}
                    />
                </section>

                {/* Respondent Address */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Respondent Address
                    </h2>

                    <InfoRow
                        label="Respondent Office Address:"
                        value={appeal.respondentOfficeAddressLine1}
                    />

                    <InfoRow
                        label="Respondent Service Address:"
                        value={appeal.respondentServiceAddressLine1}
                    />
                </section>

                {/* Respondent Contact */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Respondent Contact
                    </h2>

                    <InfoRow
                        label="Mobile Number:"
                        value={appeal.respondentMobileNumber}
                    />
                    <InfoRow
                        label="Email Address:"
                        value={appeal.respondentEmailAddress}
                    />
                </section>

                {/* Appeal Details  */}

                {/* Project Registration Number */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Jurisdiction of the Appellant Tribunal
                    </h2>

                    <p>
                        The appellant declares that the subject matter of the
                        appeal falls within the jurisdiction of the Appellate
                        Tribunal.
                    </p>

                    <InfoRow
                        label="Project Registration Number: "
                        value={appeal.projectRegistrationNumber}
                    />
                </section>

                {/* Limitation */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Limitation
                    </h2>

                    <InfoRow
                        label="The appellant declares that the appeal is within the
                        limitation specified in subsection (2) of section 44."
                        value={appeal.isFiledWithinLimitation ? 'Yes' : 'No'}
                    />

                    <InfoRow
                        label="If the appeal is filed after the expiry of the limitation period specified under subsection (2) of section 44 specify reasons for delay."
                        value={appeal.delayReason || '—'}
                    />
                </section>

                {/* Facts of case */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Facts of case
                    </h2>
                    <div className="py-2">{appeal.factsOfCase}</div>
                </section>

                {/* Grounds of appeal */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Grounds of Appeal
                    </h2>
                    <div className="py-2">{appeal.groundsOfAppeal}</div>
                </section>

                {/* Relief Sought */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Relief(s) sought
                    </h2>
                    <div className="py-2">{appeal.reliefSought}</div>
                </section>

                {/*  */}
                {/* Interim order */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Interim order, if prayed for
                    </h2>

                    <InfoRow
                        label="Pending final decision on the appeal, the appellant seeks issue of the following
                                interim order:"
                        value={appeal.interimReliefRequested || '—'}
                    />
                </section>
                {/* Limitation */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Matter not pending with any other court, etc.
                    </h2>

                    <InfoRow
                        label="Matter not pending with any other court, etc:"
                        value={appeal.isMatterPendingInCourt ? 'Yes' : 'No'}
                    />
                </section>

                {/* Payment */}
                {/* <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Payment
                    </h2>

                    <InfoRow label="Order ID" value={order_id} />
                    <InfoRow label="Amount" value={amount} />
                    <InfoRow
                        label="Status"
                        value={
                            <Badge variant={getPaymentVariant(status)}>
                                {formatStatus(status)}
                            </Badge>
                        }
                    />
                    <InfoRow label="Payment Mode" value={payment_mode} />
                </section> */}
            </CardContent>
        </Card>
    );
}

'use client';

import { format } from 'date-fns';

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
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as z from 'zod';
import { Calendar } from '@/components/ui/calendar';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

type AppealDetail = {
    id: number;
    description: string;
    appealChecklist: {
        complaintNumber: string;
        sectionNumber: string;
    } | null;
};

type SendToHearningInput = z.input<typeof formSchema2>;
type SendToHearningOutput = z.input<typeof formSchema2>;

const formSchema = z.object({
    complaintNumber: z.string().min(1, 'Complaint number is required'),
    sectionNumber: z.string().min(1, 'Section number is required'),
});

const formSchema2 = z.object({
    hearingDate: z.date({
        error: 'Hearing date is required',
    }),
    registrarComments: z.string().min(1, 'Registrar comment is required'),
});

const formSchema3 = z.object({
    registrarComment: z.string().min(1, 'Registrar comment is required'),
});

export default function RegistrarAppealDetailPage(props: Props) {
    const { id } = use(props.params);
    const router = useRouter();

    const [appeal, setAppeal] = useState<AppealDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // mode: 'onChange',
        defaultValues: {
            complaintNumber: '',
            sectionNumber: '',
        },
    });

    const form2 = useForm<SendToHearningInput>({
        resolver: zodResolver(formSchema2),
        mode: 'onChange',
        defaultValues: {
            hearingDate: undefined,
            registrarComments: '',
        },
    });

    const form3 = useForm<z.infer<typeof formSchema3>>({
        resolver: zodResolver(formSchema3),
        mode: 'onChange',
        defaultValues: {
            registrarComment: '',
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = async () => {
        const isValid = await form2.trigger();

        if (isValid) {
            setIsDialogOpen(true);
        }
    };

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const checklist = await apiFetch(
                `/registrar/appeals/${id}/checklist`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                },
            );

            setAppeal((prev) =>
                prev
                    ? {
                          ...prev,
                          appealChecklist: checklist,
                      }
                    : prev,
            );

            // toast success message - add later
        } catch (error) {
            console.error(error);
        }
    }

    async function onHearingSubmit(data: SendToHearningOutput) {
        try {
            await apiFetch(`/registrar/appeals/${id}/send-to-hearing`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            setIsDialogOpen(false);
            router.push('/registrar');

            // toast success message - add later
        } catch (error) {
            console.error(error);
        }
    }

    async function onRevert(data: z.infer<typeof formSchema3>) {
        try {
            await apiFetch(`/registrar/appeals/${id}/revert`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            router.push('/registrar');

            // toast success message - add later
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                const appeal = await apiFetch(`/registrar/appeals/${id}`);
                setAppeal(appeal);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppeal();
    }, [id]);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6">Loading ...</CardContent>
            </Card>
        );
    }

    if (!appeal) {
        return (
            <Card>
                <CardContent>Appeal not found</CardContent>
            </Card>
        );
    }

    return (
        <>
            {/* appeal description */}
            <Card className="max-w-4xl">
                <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Appeal #{id}
                            </h1>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Description */}
                    <section className="space-y-2 border-b pb-4 last:border-none">
                        <h2 className="text-base font-semibold text-muted-foreground">
                            Description
                        </h2>
                        <div className="py-2">{appeal.description}</div>
                    </section>
                </CardContent>
            </Card>

            {/* appeal revert */}
            <Card className="mt-4 max-w-4xl">
                <CardHeader>
                    <CardTitle>Revert back to appellant</CardTitle>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <form
                            id="revert-back-form"
                            onSubmit={form3.handleSubmit(onRevert)}
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
                                        control={form3.control}
                                        render={({ field, fieldState }) => (
                                            <Field
                                                data-invalid={
                                                    fieldState.invalid
                                                }
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
                                        form="revert-back-form"
                                        disabled={form3.formState.isSubmitting}
                                    >
                                        Revert back to appellant
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </CardContent>
            </Card>

            {/* appeal checklist */}
            {!appeal.appealChecklist && (
                <Card className="mt-4 max-w-4xl">
                    <CardHeader>
                        <CardTitle>Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            id="checklist-form"
                            className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FieldGroup>
                                <Controller
                                    name="complaintNumber"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="complaintNumber">
                                                Complaint Number
                                            </FieldLabel>
                                            <Input
                                                type="text"
                                                {...field}
                                                id="complaintNumber"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
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
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="sectionNumber">
                                                Section Number
                                            </FieldLabel>
                                            <Input
                                                type="text"
                                                {...field}
                                                id="sectionNumber"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
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
                                disabled={form.formState.isSubmitting}
                                className="self-start"
                            >
                                Submit checklist
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* appeal hearing */}
            {appeal.appealChecklist && (
                <Card className="mt-4 max-w-4xl">
                    <CardHeader>
                        <CardTitle>Send to hearing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="hearing-form" className="flex flex-col gap-4">
                            <FieldGroup>
                                <Controller
                                    name="hearingDate"
                                    control={form2.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="registrarComment">
                                                Date of hearing
                                            </FieldLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
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
                                                                Select date
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
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        defaultMonth={
                                                            field.value
                                                        }
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
                                    control={form2.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor="registrarComment">
                                                Registrar Comment
                                            </FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="registrarComments"
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

                            <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                            >
                                <Button
                                    type="button"
                                    className="self-start"
                                    onClick={handleOpenDialog}
                                >
                                    Send to hearing
                                </Button>

                                <DialogContent>
                                    <DialogTitle>
                                        Are you sure you want to send this
                                        appeal to hearing?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action will send the appeal to
                                        hearing.
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            form="hearing-form"
                                            onClick={form2.handleSubmit(
                                                onHearingSubmit,
                                            )}
                                            disabled={
                                                form2.formState.isSubmitting
                                            }
                                        >
                                            Confirm & Send to hearing
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </form>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

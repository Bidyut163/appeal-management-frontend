'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { apiFetch } from '@/lib/api';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import * as z from 'zod';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

type AppealDetail = {
    id: number;
    description: string;
};

const formSchema = z.object({
    verifierComment: z.string().trim().min(1, 'Verifier comment required'),
});

export default function VerifierAppealDetailPage(props: Props) {
    const { id } = use(props.params);
    const router = useRouter();

    const [appeal, setAppeal] = useState<AppealDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            verifierComment: '',
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = async () => {
        const isValid = await form.trigger();

        if (isValid) {
            setIsDialogOpen(true);
        }
    };

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            // throw new Error('This is a test error');

            await apiFetch(`/verifier/appeals/${id}/verify`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            setIsDialogOpen(false);

            // toast success message
            toast.success('Appeal forwarded to registrar.');
            router.push('/verifier');
        } catch (error) {
            console.error(error);
            toast.error(getErrorMessage(error));
        }
    }

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                const appeal = await apiFetch(`/verifier/appeals/${id}`);
                setAppeal(appeal);
            } catch (error) {
                console.error(error);
                toast.error(getErrorMessage(error));
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

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Review & Forward</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id="verifier-form" className="flex flex-col gap-4">
                        <FieldGroup>
                            <Controller
                                name="verifierComment"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="verifierComment">
                                            Verifier Comment
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="verifierComment"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Verifier comment"
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

                        {/*  */}
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        >
                            {/* <DialogTrigger asChild>
                                <Button type="button" className="self-start">
                                    Forward to Registrar
                                </Button>
                            </DialogTrigger> */}
                            <Button
                                type="button"
                                className="self-start"
                                onClick={handleOpenDialog}
                            >
                                Forward to Registrar
                            </Button>

                            <DialogContent>
                                <DialogTitle>
                                    Are you sure you want to forward this
                                    appeal?
                                </DialogTitle>
                                <DialogDescription>
                                    This action will send the appeal to
                                    registrar for further review.
                                </DialogDescription>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        form="verifier-form"
                                        onClick={form.handleSubmit(onSubmit)}
                                        disabled={form.formState.isSubmitting}
                                    >
                                        Confirm & Forward
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

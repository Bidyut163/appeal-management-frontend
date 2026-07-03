'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import * as z from 'zod';

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

type FormData = z.infer<typeof formSchema>;

const formSchema = z
    .object({
        description: z.string().trim().min(1, 'Description is required'),
    })
    .strict();

export default function FilePage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAppealMutation = useMutation({
        mutationFn: (data: FormData) =>
            apiFetch('/appeals', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.appeals,
            });

            toast.success('Appeal filed successfully.');
            router.push('/appeals');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        createAppealMutation.mutate(data);
    }

    return (
        <Card className="max-w-3xl">
            <CardHeader>
                <CardTitle>File Appeal</CardTitle>
                <CardDescription>Fill out the following form</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FieldGroup>
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Description"
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
                        className="self-start"
                        type="submit"
                        disabled={createAppealMutation.isPending}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

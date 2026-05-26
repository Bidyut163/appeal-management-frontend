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

const formSchema = z
    .object({
        description: z.string().trim().min(1, 'Description is required'),
    })
    .strict();

export default function FilePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
        },
    });

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await apiFetch('/appeals', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            router.push('/appeals');
        } catch (error) {
            console.error(error);
        }
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
                        disabled={form.formState.isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

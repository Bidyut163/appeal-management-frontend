'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { signupSchema, type SignupInput } from './schemas';
import Image from 'next/image';

export default function SignupPage() {
    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const router = useRouter();

    const signupMutation = useMutation({
        mutationFn: (data: SignupInput) =>
            apiFetch('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: () => {
            toast.success('User created!');
            router.push('/login');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    function onSubmit(data: SignupInput) {
        signupMutation.mutate(data);
    }

    return (
        <>
            <Image
                src="/logo-reat.png"
                alt="Assam REAT logo"
                width={220}
                height={220}
                className="mx-auto"
            />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        Register for your Assam REAT account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="signup-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Fullname"
                                            autoComplete="name"
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
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="email"
                                            id="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="john@example.com"
                                            autoComplete="email"
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
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            id="password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="********"
                                            autoComplete="new-password"
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
                            form="signup-form"
                            // disabled={form.formState.isSubmitting}
                            disabled={signupMutation.isPending}
                        >
                            Signup
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Already have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/login">Log in</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

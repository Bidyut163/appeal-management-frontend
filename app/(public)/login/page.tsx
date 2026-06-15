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
import { PersonStandingIcon } from 'lucide-react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import * as z from 'zod';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

import { getDefaultRoute } from '@/utils/getDefaultRoute';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';

const formSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(1, 'password is required'),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const response = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            // console.log(response);

            setUser(response.user);

            toast.success(`Welcome, ${response.user.name}!`);
            // role specific redirects
            router.push(getDefaultRoute(response.user.roles));
        } catch (error) {
            console.error(error);
            toast.error(getErrorMessage(error));
        }
    }

    return (
        <>
            <PersonStandingIcon size={50} />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Login to your Assam REAT account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="login-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FieldGroup>
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
                                            autoComplete="current-password"
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
                            form="login-form"
                            disabled={form.formState.isSubmitting}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Don't have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/signup">Sign up</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

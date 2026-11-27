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
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

import {
    UserRoundIcon,
    ClipboardCheckIcon,
    GavelIcon,
    ShieldCheckIcon,
} from 'lucide-react';

type LoginInput = z.infer<typeof formSchema>;

const DEMO_PASSWORD = 'password123'; // Use the password from your seed file

const demoAccounts = [
    {
        label: 'Appellant',
        email: 'appellant@example.com',
        icon: UserRoundIcon,
    },
    {
        label: 'Verifier',
        email: 'verifier@example.com',
        icon: ClipboardCheckIcon,
    },
    {
        label: 'Registrar',
        email: 'registrar@example.com',
        icon: GavelIcon,
    },
    {
        label: 'Admin',
        email: 'admin@example.com',
        icon: ShieldCheckIcon,
    },
];

const formSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(1, 'password is required'),
});

export default function LoginPage() {
    const form = useForm<LoginInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: (data: LoginInput) =>
            apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: (response) => {
            setUser(response.user);

            toast.success(`Welcome, ${response.user.name}!`);
            // role specific redirects
            router.push(getDefaultRoute(response.user.roles));
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        loginMutation.mutate(data);
    }

    return (
        <>
            <Image
                src="/logo-reat.png"
                alt="Assam REAT logo"
                width={220}
                height={220}
                className="mx-auto"
                priority
            />
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
                            // disabled={form.formState.isSubmitting}
                            disabled={loginMutation.isPending}
                        >
                            Login
                        </Button>
                    </form>
                    <div className="mt-5 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-xs font-medium text-muted-foreground">
                                OR EXPLORE THE DEMO
                            </span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {demoAccounts.map((account) => {
                                const Icon = account.icon;

                                return (
                                    <Button
                                        key={account.email}
                                        type="button"
                                        variant="outline"
                                        className="justify-start gap-2"
                                        disabled={loginMutation.isPending}
                                        onClick={() => {
                                            form.setValue(
                                                'email',
                                                account.email,
                                                {
                                                    shouldValidate: true,
                                                },
                                            );

                                            form.setValue(
                                                'password',
                                                DEMO_PASSWORD,
                                                {
                                                    shouldValidate: true,
                                                },
                                            );
                                        }}
                                    >
                                        <Icon className="size-4 text-primary" />
                                        {account.label}
                                    </Button>
                                );
                            })}
                        </div>

                        <p className="text-center text-xs text-muted-foreground">
                            Select a role to automatically fill in demo
                            credentials.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Don&apos;t have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/signup">Sign up</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

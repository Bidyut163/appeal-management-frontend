'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { apiFetch } from '@/lib/api';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formShema = z.object({
    name: z.string().trim().min(1, 'Official name is required'),
    email: z.email('Invalid email address'),
    password: z
        .string()
        .trim()
        .min(8, 'password needs to be atleast 8 characters long'),
    role: z.enum(['VERIFIER', 'REGISTRAR']),
});

type CreateOfficialInput = z.infer<typeof formShema>;

export default function CreateUsersPage() {
    const router = useRouter();

    const form = useForm<CreateOfficialInput>({
        resolver: zodResolver(formShema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'REGISTRAR',
        },
    });

    const createOfficialMutation = useMutation({
        mutationFn: (data: CreateOfficialInput) =>
            apiFetch('/admin/officials', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: () => {
            toast.success(`Official created successfully!`);

            router.push('/admin/users');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    function onSubmit(data: CreateOfficialInput) {
        createOfficialMutation.mutate(data);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create an official</CardTitle>
                <CardDescription>
                    Create a new registrar or verifier account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="create-official-form"
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
                                        Name of the official
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Name of the official"
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
                                        Email of the official
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Email of the official"
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

                        <Controller
                            name="role"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="select-role">
                                        Role of the official
                                    </FieldLabel>
                                    <Select
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="select-role"
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="REGISTRAR">
                                                REGISTRAR
                                            </SelectItem>
                                            <SelectItem value="VERIFIER">
                                                VERIFIER
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription>
                                        Assign the role for the official.
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button type="submit">Create official</Button>
                </form>
            </CardContent>
        </Card>
    );
}

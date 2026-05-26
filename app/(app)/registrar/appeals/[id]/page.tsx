'use client';

// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogTitle,
// } from '@/components/ui/dialog';
// import {
//     Field,
//     FieldError,
//     FieldGroup,
//     FieldLabel,
// } from '@/components/ui/field';
// import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';

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

// const formSchema = z.object({
//     verifierComment: z.string().trim().min(1, 'Verifier comment required'),
// });

export default function RegistrarAppealDetailPage(props: Props) {
    const { id } = use(props.params);
    // const router = useRouter();

    const [appeal, setAppeal] = useState<AppealDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     mode: 'onChange',
    //     defaultValues: {
    //         verifierComment: '',
    //     },
    // });

    // const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const handleOpenDialog = async () => {
    //     const isValid = await form.trigger();

    //     if (isValid) {
    //         setIsDialogOpen(true);
    //     }
    // };

    // async function onSubmit(data: z.infer<typeof formSchema>) {
    //     try {
    //         await apiFetch(`/verifier/appeals/${id}/verify`, {
    //             method: 'PATCH',
    //             body: JSON.stringify(data),
    //         });

    //         // setIsDialogOpen(false);
    //         router.push('/verifier');

    //         // toast success message - add later
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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
        </>
    );
}

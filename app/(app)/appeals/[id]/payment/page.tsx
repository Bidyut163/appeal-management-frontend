'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APPEAL_FILING_FEE } from '@/constants/payment';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

import { use, useEffect } from 'react';
import { toast } from 'sonner';
import {
    CreateOrderResponse,
    FailedPaymentRequest,
    RazorpayFailureResponse,
    RazorpaySuccessResponse,
    VerifyPaymentRequest,
} from './types';

import InfoRow from './InfoRow';
import { getAppealStatusVariant } from '@/utils/getAppealStatusVariant';
import { formatStatus } from '@/utils/formatStatus';
import { AppealDetail } from '@/types/appeal';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function PaymentPage(props: Props) {
    const { id } = use(props.params);
    const router = useRouter();

    const handlePayNow = (appealId: number) => {
        const data = { appealId };
        createOrderMutation.mutate(data);
    };

    const openRazorpayCheckout = (order: CreateOrderResponse) => {
        const options = {
            key: order.key,
            amount: order.amount,
            currency: order.currency,
            order_id: order.orderId,

            name: 'Assam REAT',

            description: 'Appeal Filing Fee',

            handler: (response: RazorpaySuccessResponse) => {
                // console.log(response);
                const payload = {
                    appealId: Number(id),
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                verifyPaymentMutation.mutate(payload);
            },

            modal: {
                ondismiss: () => {
                    toast.info('Payment cancelled.');
                },
            },

            prefill: {
                name: appeal?.appellantName,
                email: appeal?.appellantEmailAddress,
                contact: appeal?.appellantMobileNumber,
            },

            theme: {
                color: '#005f78',
            },
        };

        const razorpay = new window.Razorpay(options);
        // ==============on failure============
        razorpay.on(
            'payment.failed',
            function (response: RazorpayFailureResponse) {
                const payload = {
                    appealId: Number(id),
                    razorpayOrderId: response.error.metadata.order_id,
                    razorpayPaymentId: response.error.metadata.payment_id,
                    razorpayErrorCode: response.error.code,
                    razorpayErrorDescription: response.error.description,
                };

                failedPaymentMutation.mutate(payload);
            },
        );
        // ================

        razorpay.open();
    };

    const verifyPaymentMutation = useMutation({
        mutationFn: (data: VerifyPaymentRequest) =>
            apiFetch('/payments/verify', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: () => {
            toast.success('Payment successful');
            router.push('/appeals');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const failedPaymentMutation = useMutation({
        mutationFn: (data: FailedPaymentRequest) =>
            apiFetch('/payments/failure', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: () => {
            toast.error('Payment failed. Please try again.');
            router.push('/appeals');
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const createOrderMutation = useMutation<
        CreateOrderResponse,
        Error,
        { appealId: number }
    >({
        mutationFn: (data: { appealId: number }) =>
            apiFetch(`/payments/order`, {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        onSuccess: (order) => {
            openRazorpayCheckout(order);
        },

        onError: (error) => {
            console.error(error);
            toast.error(getErrorMessage(error));
        },
    });

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail>({
        // queryKey: ['appeal', id],
        queryKey: queryKeys.appeal(id),
        queryFn: () => apiFetch(`/appeals/${id}`),
    });

    useEffect(() => {
        if (appeal && appeal.status !== 'DRAFT') {
            router.replace(`/appeals/${appeal.id}`);
        }
    }, [appeal, router]);

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Failed to load appeals</CardTitle>
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

    if (appeal.status !== 'DRAFT') {
        return null;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-xl font-semibold">
                            Payment for Appeal #{appeal.id}
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
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <section className="space-y-2 border-b pb-4 last:border-none">
                        <h2 className="text-base font-semibold text-muted-foreground">
                            Fee Summary
                        </h2>

                        <InfoRow
                            label="Appeal Filing Fee"
                            value={`₹${APPEAL_FILING_FEE}`}
                        />
                        <InfoRow
                            label="Total"
                            value={
                                <span className="font-bold text-lg">
                                    ₹{APPEAL_FILING_FEE}
                                </span>
                            }
                        />
                    </section>
                    <section className="space-y-2 border-b pb-4 last:border-none">
                        <h2 className="text-base font-semibold text-muted-foreground">
                            Appeal Summary
                        </h2>

                        <InfoRow
                            label="Appellant"
                            value={appeal.appellantName}
                        />
                        <InfoRow
                            label="Respondent"
                            value={appeal.respondentName}
                        />
                        <InfoRow label="Appeal ID:" value={appeal.id} />
                    </section>
                    <section className="space-y-2 border-b pb-4 last:border-none">
                        <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                            <AlertTriangleIcon />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                                Payment is required before the appeal is
                                submitted for verification.
                            </AlertDescription>
                        </Alert>

                        <Button
                            className="mt-4 cursor-pointer"
                            disabled={
                                createOrderMutation.isPending ||
                                verifyPaymentMutation.isPending ||
                                failedPaymentMutation.isPending
                            }
                            onClick={() => handlePayNow(appeal.id)}
                        >
                            {createOrderMutation.isPending
                                ? 'Creating Order...'
                                : `Pay ₹${APPEAL_FILING_FEE}`}
                        </Button>
                    </section>
                </CardContent>
            </Card>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        </>
    );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';

import { DownloadIcon } from 'lucide-react';
import { use, useEffect, useState } from 'react';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

// function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
//     return (
//         <div className="flex py-3 border-b last:border-none">
//             <span className="w-50 text-muted-foreground">{label}</span>
//             <span className="font-medium">{value}</span>
//         </div>
//     );
// }

type Appeal = {
    id: number;
    // appellant: string;
    // respondent: string;
    description: string;

    // payment_status: 'pending' | 'success' | 'failed';
    appeal_status:
        | 'DRAFT'
        | 'UNDER_VERIFICATION'
        | 'WITH_REGISTRAR'
        | 'REVERTED_TO_APPELLANT'
        | 'UNDER_HEARING'
        | 'CLOSED'
        | 'REJECTED';
};
type AppealDetail = {
    id: string;
    // appellant: string;
    // respondent: string;
    // appellant_address: string;
    // respondent_address: string;
    description: string;
    // appeal_grounds: string;
    // payment_detail: {
    //     order_id: string;
    //     amount: number;
    //     status: Appeal['payment_status'];
    //     payment_mode: string;
    // };
    status: Appeal['appeal_status'];
};

// function getPaymentVariant(
//     status: Appeal['payment_status'],
// ): 'success' | 'pending' | 'failed' {
//     switch (status) {
//         case 'success':
//             return 'success';
//         case 'pending':
//             return 'pending';
//         case 'failed':
//             return 'failed';
//         default:
//             return 'pending';
//     }
// }

function getAppealStatusVariant(
    status: Appeal['appeal_status'],
): 'success' | 'pending' | 'default' | 'failed' {
    switch (status) {
        case 'DRAFT':
            return 'pending';
        case 'UNDER_VERIFICATION':
            return 'default';
        case 'WITH_REGISTRAR':
            return 'default';
        case 'REVERTED_TO_APPELLANT':
            return 'default';
        case 'UNDER_HEARING':
            return 'success';
        case 'CLOSED':
            return 'success';
        case 'REJECTED':
            return 'failed';
        default:
            return 'pending';
    }
}

function formatStatus(status: string) {
    return status.replaceAll('_', ' ');
}

// async function getAppeal(id: string): Promise<AppealDetail> {
//     // throw new Error('Failed to fetch appeal');

//     return {
//         id,
//         appellant: 'Padum Deuri',
//         respondent: 'RERA Assam',
//         appellant_address: 'Generic: 123 Main St, Anytown, USA 12345',
//         respondent_address:
//         'Sample Place: 4567 Fake St, Mountain View, CA 94043',
//         appeal_description:
//             ' Lorem ipsum dolor sit amet consectetur, adipisicing',
//         appeal_grounds: ' Lorem ipsum dolor sit amet consectetur, adipisicing',
//         payment_detail: {
//             order_id: '8x45tt678',
//             amount: 1000,
//             status: 'success',
//             payment_mode: 'Debit card',
//         },
//         appeal_status: 'with_officials',
//     };
// }

export default function AppealDetailPage(props: Props) {
    const { id } = use(props.params);
    // const appeal = await getAppeal(id);

    const [appeal, setAppeal] = useState<AppealDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                const data = await apiFetch(`/appeals/${id}`);

                setAppeal(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppeal();
    }, [id]);

    // const {
    //     appellant,
    //     respondent,
    //     appellant_address,
    //     respondent_address,
    //     description,
    //     appeal_grounds,
    //     payment_detail: { order_id, amount, status, payment_mode },
    //     status,
    // } = appeal;

    // await new Promise((res) => setTimeout(res, 2000));

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

    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Appeal #{id}</h1>
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
                    </div>

                    <Button size="sm">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download Receipt
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Parties */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Parties
                    </h2>

                    {/* <InfoRow label="Appellant Name" value={appellant} /> */}
                    {/* <InfoRow label="Respondent Name" value={respondent} /> */}
                </section>

                {/* Address */}
                {/* <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Address
                    </h2>

                    <InfoRow
                        label="Appellant Address"
                        value={appellant_address}
                    />
                    <InfoRow
                        label="Respondent Address"
                        value={respondent_address}
                    />
                </section> */}

                {/* Description */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Description
                    </h2>
                    <div className="py-2">{appeal.description}</div>
                </section>

                {/* Grounds of appeal */}
                {/* <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Grounds of Appeal
                    </h2>
                    <div className="py-2">{appeal_grounds}</div>
                </section> */}
                {/* Payment */}
                {/* <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Payment
                    </h2>

                    <InfoRow label="Order ID" value={order_id} />
                    <InfoRow label="Amount" value={amount} />
                    <InfoRow
                        label="Status"
                        value={
                            <Badge variant={getPaymentVariant(status)}>
                                {formatStatus(status)}
                            </Badge>
                        }
                    />
                    <InfoRow label="Payment Mode" value={payment_mode} />
                </section> */}
            </CardContent>
        </Card>
    );
}

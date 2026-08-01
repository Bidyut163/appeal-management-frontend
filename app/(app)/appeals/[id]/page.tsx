'use client';

import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

// import { DownloadIcon } from 'lucide-react';
import { use } from 'react';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex py-3 border-b last:border-none">
            <span className="w-50 text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

type Appeal = {
    id: number;
    // appellant: string;
    // respondent: string;
    // description: string;

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
    appellantName: string;
    respondentName: string;
    // appellant_address: string;
    // respondent_address: string;
    factsOfCase: string;
    groundsOfAppeal: string;
    reliefSought: string;
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

export default function AppealDetailPage(props: Props) {
    const { id } = use(props.params);

    const {
        data: appeal,
        isLoading,
        error,
    } = useQuery<AppealDetail | null>({
        // queryKey: ['appeal', id],
        queryKey: queryKeys.appeal(id),
        queryFn: () => apiFetch(`/appeals/${id}`),
    });
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

    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Appeal #{appeal.id}
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
                    </div>

                    {/* <Button size="sm">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download Receipt
                    </Button> */}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Parties */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Parties
                    </h2>

                    <InfoRow
                        label="Appellant Name"
                        value={appeal.appellantName}
                    />
                    <InfoRow
                        label="Respondent Name"
                        value={appeal.respondentName}
                    />
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

                {/* Facts of case */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Facts of case
                    </h2>
                    <div className="py-2">{appeal.factsOfCase}</div>
                </section>

                {/* Grounds of appeal */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Grounds of Appeal
                    </h2>
                    <div className="py-2">{appeal.groundsOfAppeal}</div>
                </section>

                {/* Relief Sought */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Relief(s) sought
                    </h2>
                    <div className="py-2">{appeal.reliefSought}</div>
                </section>
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

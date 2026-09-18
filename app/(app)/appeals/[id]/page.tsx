'use client';

import AppealHeader from '@/components/appeals/detail/AppealHeader';
import AppealDetailComponent from '@/components/appeals/detail/AppealDetail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import type { AppealDetail } from '@/types/appeal';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

// import { DownloadIcon } from 'lucide-react';
import { use } from 'react';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

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
            <AppealHeader id={appeal.id} status={appeal.status} />
            <CardContent className="space-y-6">
                {/* appeal detail */}
                <AppealDetailComponent appeal={appeal} />
            </CardContent>
        </Card>
    );
}

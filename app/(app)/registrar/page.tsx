'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { type Appeal, columns } from './columns';

import { apiFetch } from '@/lib/api';

import { getErrorMessage } from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';

export default function RegistrarPage() {
    // const [appeals, setAppeals] = useState<Appeal[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchAppeals = async () => {
    //         try {
    //             const appealsList = await apiFetch('/registrar/appeals');

    //             setAppeals(appealsList);
    //         } catch (error) {
    //             console.error(error);
    //             toast.error(getErrorMessage(error));
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchAppeals();
    // }, []);

    const {
        data: appeals = [],
        isLoading,
        error,
    } = useQuery<Appeal[]>({
        queryKey: ['appeals', 'registrar'],
        queryFn: () => apiFetch('/registrar/appeals'),
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
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    if (appeals.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No appeals pending registrar review</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registrar Review Queue</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={appeals} />
            </CardContent>
        </Card>
    );
}

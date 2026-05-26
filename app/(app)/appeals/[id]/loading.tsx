import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonRow() {
    return (
        <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-64" />
        </div>
    );
}

export default function Loading() {
    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-start justify-between">
                    <Skeleton className="h-6 w-40 rounded-full" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Parties */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <Skeleton className="h-5 w-25 rounded-full" />

                    <SkeletonRow />
                    <SkeletonRow />
                </section>
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <Skeleton className="h-5 w-25 rounded-full" />

                    <SkeletonRow />
                    <SkeletonRow />
                </section>
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <Skeleton className="h-25 w-full rounded-md" />
                </section>
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <Skeleton className="h-25 w-full rounded-md" />
                </section>
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                </section>
            </CardContent>
        </Card>
    );
}

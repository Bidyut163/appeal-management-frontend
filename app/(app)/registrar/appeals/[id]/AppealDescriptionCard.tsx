import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AppealDescriptionCardProps {
    id: number;
    description: string;
}

export default function AppealDescriptionCard({
    id,
    description,
}: AppealDescriptionCardProps) {
    return (
        <Card className="max-w-4xl">
            <CardHeader>
                <CardTitle>Appeal #{id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Description */}
                <section className="space-y-2 border-b pb-4 last:border-none">
                    <h2 className="text-base font-semibold text-muted-foreground">
                        Description
                    </h2>
                    <div className="py-2">{description}</div>
                </section>
            </CardContent>
        </Card>
    );
}

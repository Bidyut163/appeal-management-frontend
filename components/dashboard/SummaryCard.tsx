import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
}

export default function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
}: SummaryCardProps) {
    return (
        <Card>
            <CardContent className="flex justify-between items-center p-5">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                        {value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </CardContent>
        </Card>
    );
}

import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AppealStatus } from '@/types/appeal';
import { getAppealStatusVariant } from '@/utils/getAppealStatusVariant';
import { formatStatus } from '@/utils/formatStatus';

interface Props {
    id: number;
    status: AppealStatus;
}

export default function AppealHeader({ id, status }: Props) {
    return (
        <CardHeader className="border-b px-6 pb-5">
            <CardTitle className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                    Appeal #{id}
                </h1>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Status:
                    </span>

                    <Badge variant={getAppealStatusVariant(status)}>
                        {formatStatus(status)}
                    </Badge>
                </div>
            </CardTitle>
        </CardHeader>
    );
}

import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AppealStatus } from '@/types/appeal';
import { getAppealStatusVariant } from '@/utils/getAppealStatusVariant';

interface Props {
    id: number;
    status: AppealStatus;
}

function formatStatus(status: AppealStatus) {
    return status.replaceAll('_', ' ');
}

export default function AppealHeader({ id, status }: Props) {
    return (
        <CardHeader>
            <CardTitle className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Appeal #{id}</h1>

                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Status:
                        </span>

                        <Badge variant={getAppealStatusVariant(status)}>
                            {formatStatus(status)}
                        </Badge>
                    </div>
                </div>
            </CardTitle>
        </CardHeader>
    );
}

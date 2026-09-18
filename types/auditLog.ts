export interface AuditLog {
    id: number;
    appealId: number;
    userId: number;
    action: string;
    details: Record<string, unknown> | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        roles: {
            name: string;
        }[];
    } | null;
}

import type { AuditLog } from '@/types/auditLog';
import { formatDate } from './formatDate';

export const getAuditLogDetails = (log: AuditLog) => {
    const details = log.details;

    if (!details) return null;

    switch (log.action) {
        case 'APPEAL_CREATED':
            return `Status: ${details.status}`;

        case 'APPEAL_SUBMITTED':
            return `Payment: ${details.paymentStatus} • Status: ${details.status}`;

        case 'APPEAL_VERIFIED':
            return `Status: ${details.status}`;

        case 'APPEAL_REVERTED':
            return `Reason: ${details.reason}`;

        case 'APPEAL_RESUBMITTED':
            return `Status: ${details.status}`;

        case 'HEARING_SCHEDULED':
            return `Hearing #${details.hearingNumber} • Hearing Date: ${formatDate(String(details.hearingDate))}`;

        case 'HEARING_COMPLETED':
            return `Hearing #${details.hearingNumber}`;

        case 'APPEAL_DISPOSED':
            return `Decision: ${details.comment}`;

        case 'APPEAL_REJECTED':
            return `Reason: ${details.reason}`;

        default:
            return null;
    }
};

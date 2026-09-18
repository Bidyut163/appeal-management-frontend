export const getAuditLogActionLabel = (action: string) => {
    switch (action) {
        case 'APPEAL_CREATED':
            return 'Appeal Created';
        case 'APPEAL_SUBMITTED':
            return 'Appeal Submitted';
        case 'APPEAL_VERIFIED':
            return 'Appeal Verified';
        case 'APPEAL_REVERTED':
            return 'Appeal Reverted';
        case 'APPEAL_RESUBMITTED':
            return 'Appeal Resubmitted';
        case 'HEARING_SCHEDULED':
            return 'Hearing Scheduled';
        case 'HEARING_COMPLETED':
            return 'Hearing Completed';
        case 'APPEAL_DISPOSED':
            return 'Appeal Disposed';
        case 'APPEAL_REJECTED':
            return 'Appeal Rejected';
        default:
            return action;
    }
};

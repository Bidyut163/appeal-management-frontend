export type AppealStatus =
    | 'DRAFT'
    | 'UNDER_VERIFICATION'
    | 'WITH_REGISTRAR'
    | 'REVERTED_TO_APPELLANT'
    | 'UNDER_HEARING'
    | 'DISPOSED'
    | 'REJECTED';

// export function getAppealStatusVariant(
//     status: AppealStatus,
// ): 'success' | 'pending' | 'default' | 'failed' {
//     switch (status) {
//         case 'DRAFT':
//             return 'pending';

//         case 'UNDER_VERIFICATION':
//         case 'WITH_REGISTRAR':
//         case 'REVERTED_TO_APPELLANT':
//             return 'default';

//         case 'UNDER_HEARING':
//         case 'DISPOSED':
//             return 'success';

//         case 'REJECTED':
//             return 'failed';

//         default:
//             return 'pending';
//     }
// }

// export function formatStatus(status: string) {
//     return status.replaceAll('_', ' ');
// }

import * as z from 'zod';

// export const checklistSchema = z.object({
//     complaintNumber: z.string().min(1, 'Complaint number is required'),
//     sectionNumber: z.string().min(1, 'Section number is required'),
// });

export const checklistSchema = z
    .object({
        complaintNumber: z
            .string()
            .trim()
            .min(1, 'Complaint number is required'),

        legalProvision: z.string().trim().min(1, 'Legal provision is required'),

        isAppealCompetent: z.boolean().optional(),

        arePartiesAndAddressesProper: z.boolean().optional(),

        isCertifiedCopyFiled: z.boolean().optional(),

        orderDate: z.date().optional(),

        communicationDate: z.date().optional(),

        certifiedCopyApplicationDate: z.date().optional(),

        certifiedCopyReadyDate: z.date().optional(),

        certifiedCopyReceiptDate: z.date().optional(),

        onlineFilingDate: z.date().optional(),

        hardCopySubmissionDate: z.date().optional(),

        isHardCopySubmissionDelayed: z.boolean().optional(),

        hardCopyDelayDays: z.number().int().nonnegative().optional(),

        isAppealWithinLimitation: z.boolean().optional(),

        isAppealFilingDelayed: z.boolean().optional(),

        appealFilingDelayDays: z.number().int().nonnegative().optional(),

        isCondonationApplicationFiled: z.boolean().optional(),
        objectionForCondonationDelay: z.string().trim().optional(),

        areFeesPaid: z.boolean().optional(),
        paymentDate: z.coerce.date().optional(),

        areDocumentsFiledWithIndexPagination: z.boolean().optional(),

        areDocumentsLegible: z.boolean().optional(),

        isAppealMemoAnnexedForOtherSide: z.boolean().optional(),

        isAppealMemoServedByPostCourier: z.boolean().optional(),

        isVakalatnamaAuthorizationProper: z.boolean().optional(),

        isContactOnRecord: z.boolean().optional(),
    })
    .strict();

export const updateAppealScrutinySchema = z.object({
    appealNumber: z.string().trim().min(1),
    ...checklistSchema.shape,
});

export const hearingSchema = z.object({
    hearingDate: z.date({
        error: 'Hearing date is required',
    }),
    registrarComments: z.string().min(1, 'Registrar comment is required'),
});

export const revertSchema = z.object({
    // registrarComment: z.string().min(1, 'Registrar comment is required'),
    revertReason: z.string().min(1, 'Revert reason is required'),
    // fields: z.array(z.string()).min(1, 'Revert fields Required'),
    fields: z
        .array(
            z.object({
                name: z.string(),
                label: z.string(),
            }),
        )
        .min(1, 'At least one field is required'),
});

export type CreateChecklistInput = z.infer<typeof checklistSchema>;
export type UpdateAppealScrutinyInput = z.input<
    typeof updateAppealScrutinySchema
>;
export type UpdateAppealScrutinyOutput = z.output<
    typeof updateAppealScrutinySchema
>;
export type SendToHearingInput = z.input<typeof hearingSchema>;
export type SendToHearingOutput = z.output<typeof hearingSchema>;
export type RevertAppealFormInput = z.infer<typeof revertSchema>;
export type RevertAppealInput = {
    revertReason: string;
    fields: string[];
};

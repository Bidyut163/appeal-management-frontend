import * as z from 'zod';

export const checklistSchema = z.object({
    complaintNumber: z.string().min(1, 'Complaint number is required'),
    sectionNumber: z.string().min(1, 'Section number is required'),
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
export type SendToHearingInput = z.input<typeof hearingSchema>;
export type SendToHearingOutput = z.output<typeof hearingSchema>;
export type RevertAppealFormInput = z.infer<typeof revertSchema>;
export type RevertAppealInput = {
    revertReason: string;
    fields: string[];
};

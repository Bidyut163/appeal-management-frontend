import z from 'zod';

export const scheduleNextHearingSchema = z.object({
    hearingDate: z.date({
        error: 'Hearing date is required',
    }),
});

export type ScheduleNextHearingInput = z.infer<
    typeof scheduleNextHearingSchema
>;

export const disposeAppealSchema = z
    .object({
        comment: z.string().trim().min(1, 'Decision comment is required'),
    })
    .strict();

export type DisposeAppealInput = z.infer<typeof disposeAppealSchema>;

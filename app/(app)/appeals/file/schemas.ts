import * as z from 'zod';

export const formSchema = z
    .object({
        // -------------Appellant------------
        appellantName: z.string().trim().min(1, 'Appellant name is required'),

        // residential address
        appellantResidentialAddressLine1: z
            .string()
            .trim()
            .min(1, 'Appellant residential address line 1 is required'),
        appellantResidentialAddressLine2: z.string().trim().optional(),
        appellantResidentialLandmark: z.string().trim().optional(),
        appellantResidentialCity: z
            .string()
            .trim()
            .min(1, 'Appellant residential address City is required'),
        appellantResidentialDistrict: z
            .string()
            .trim()
            .min(1, 'Appellant residential address District is required'),
        appellantResidentialState: z
            .string()
            .trim()
            .min(1, 'Appellant residential address State is required'),
        appellantResidentialCountry: z
            .string()
            .trim()
            .min(1, 'Appellant residential address Country is required'),
        appellantResidentialPinCode: z
            .string()
            .trim()
            .regex(/^\d{6}$/, 'Invalid PIN Code'),

        // service adddress
        appellantServiceAddressLine1: z
            .string()
            .trim()
            .min(1, 'Appellant service address line 1 is required'),
        appellantServiceAddressLine2: z.string().trim().optional(),
        appellantServiceLandmark: z.string().trim().optional(),
        appellantServiceCity: z
            .string()
            .trim()
            .min(1, 'Appellant service address City is required'),
        appellantServiceDistrict: z
            .string()
            .trim()
            .min(1, 'Appellant service address District is required'),
        appellantServiceState: z
            .string()
            .trim()
            .min(1, 'Appellant service address State is required'),
        appellantServiceCountry: z
            .string()
            .trim()
            .min(1, 'Appellant service address Country is required'),
        appellantServicePinCode: z
            .string()
            .trim()
            .regex(/^\d{6}$/, 'Invalid PIN Code'),

        // Contact Details
        appellantMobileNumber: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),

        appellantEmailAddress: z.email({
            message: 'Invalid email address format.',
        }),

        // -------------Respondent------------
        respondentName: z.string().trim().min(1, 'Respondent name is required'),

        // residential address
        respondentOfficeAddressLine1: z
            .string()
            .trim()
            .min(1, 'Respondent office address line 1 is required'),
        respondentOfficeAddressLine2: z.string().trim().optional(),
        respondentOfficeLandmark: z.string().trim().optional(),
        respondentOfficeCity: z
            .string()
            .trim()
            .min(1, 'Respondent office address City is required'),
        respondentOfficeDistrict: z
            .string()
            .trim()
            .min(1, 'Respondent office address District is required'),
        respondentOfficeState: z
            .string()
            .trim()
            .min(1, 'Respondent office address State is required'),
        respondentOfficeCountry: z
            .string()
            .trim()
            .min(1, 'Respondent office address Country is required'),
        respondentOfficePinCode: z
            .string()
            .trim()
            .regex(/^\d{6}$/, 'Invalid PIN Code'),

        // service adddress
        respondentServiceAddressLine1: z
            .string()
            .trim()
            .min(1, 'Respondent service address line 1 is required'),
        respondentServiceAddressLine2: z.string().trim().optional(),
        respondentServiceLandmark: z.string().trim().optional(),
        respondentServiceCity: z
            .string()
            .trim()
            .min(1, 'Respondent service address City is required'),
        respondentServiceDistrict: z
            .string()
            .trim()
            .min(1, 'Respondent service address District is required'),
        respondentServiceState: z
            .string()
            .trim()
            .min(1, 'Respondent service address State is required'),
        respondentServiceCountry: z
            .string()
            .trim()
            .min(1, 'Respondent service address Country is required'),
        respondentServicePinCode: z
            .string()
            .trim()
            .regex(/^\d{6}$/, 'Invalid PIN Code'),

        // Contact Details
        respondentMobileNumber: z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),

        respondentEmailAddress: z.email({
            message: 'Invalid email address format.',
        }),

        // -----------------Appeal Details---------------
        projectRegistrationNumber: z.string().trim().optional(),
        isFiledWithinLimitation: z.boolean(),
        delayReason: z.string().trim().optional(),
        factsOfCase: z.string().trim().min(1, 'Facts of case 1 is required'),
        groundsOfAppeal: z
            .string()
            .trim()
            .min(1, 'Grounds of appeal is required'),
        reliefSought: z.string().trim().min(1, 'Relief sought is required'),
        interimReliefRequested: z.string().trim().optional(),
        isMatterPendingInCourt: z.boolean(),
    })
    .superRefine((data, ctx) => {
        if (!data.isFiledWithinLimitation && !data.delayReason?.trim()) {
            ctx.addIssue({
                code: 'custom',
                path: ['delayReason'],
                message: 'Delay reason is required.',
            });
        }
    })
    .strict();

export type FormInput = z.infer<typeof formSchema>;

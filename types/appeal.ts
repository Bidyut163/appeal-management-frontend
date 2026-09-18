export type Hearing = {
    id: number;
    hearingNumber: number;
    hearingDate: string;
    status: 'SCHEDULED' | 'COMPLETED';
};

export type AppealStatus =
    | 'DRAFT'
    | 'UNDER_VERIFICATION'
    | 'WITH_REGISTRAR'
    | 'REVERTED_TO_APPELLANT'
    | 'UNDER_HEARING'
    | 'DISPOSED'
    | 'REJECTED';

export type AppealDetail = {
    id: number;

    // ---------------- Appellant ----------------

    appellantName: string;

    appellantResidentialAddressLine1: string;
    appellantResidentialAddressLine2: string | null;
    appellantResidentialLandmark: string | null;
    appellantResidentialCity: string;
    appellantResidentialDistrict: string;
    appellantResidentialState: string;
    appellantResidentialCountry: string;
    appellantResidentialPinCode: string;

    appellantServiceAddressLine1: string;
    appellantServiceAddressLine2: string | null;
    appellantServiceLandmark: string | null;
    appellantServiceCity: string;
    appellantServiceDistrict: string;
    appellantServiceState: string;
    appellantServiceCountry: string;
    appellantServicePinCode: string;

    appellantMobileNumber: string;
    appellantEmailAddress: string;

    // ---------------- Respondent ----------------

    respondentName: string;

    respondentOfficeAddressLine1: string;
    respondentOfficeAddressLine2: string | null;
    respondentOfficeLandmark: string | null;
    respondentOfficeCity: string;
    respondentOfficeDistrict: string;
    respondentOfficeState: string;
    respondentOfficeCountry: string;
    respondentOfficePinCode: string;

    respondentServiceAddressLine1: string;
    respondentServiceAddressLine2: string | null;
    respondentServiceLandmark: string | null;
    respondentServiceCity: string;
    respondentServiceDistrict: string;
    respondentServiceState: string;
    respondentServiceCountry: string;
    respondentServicePinCode: string;

    respondentMobileNumber: string;
    respondentEmailAddress: string;

    // ---------------- Appeal ----------------

    projectRegistrationNumber: string | null;

    isFiledWithinLimitation: boolean;
    delayReason: string | null;
    factsOfCase: string;
    groundsOfAppeal: string;
    reliefSought: string;
    interimReliefRequested: string | null;
    isMatterPendingInCourt: boolean;

    // ---------------- Workflow ----------------

    status: AppealStatus;

    createdAt: string;
    updatedAt: string;

    verifierComments: string | null;
    registrarComments: string | null;

    appellantId: number;

    hearings: Hearing[];

    appealChecklist: AppealChecklist | null;
};

export type AppealChecklist = {
    complaintNumber: string | null;
    sectionNumber: string | null;
};

export type AppealRevert = {
    id: number;
    appealId: number;
    reason: string;
    fields: string[];
    status: 'OPEN' | 'RESUBMITTED';
    createdById: number;
    createdAt: string;
    updatedAt: string;
};

export type AppealFormValues = {
    appellantName: string;
    appellantResidentialAddressLine1: string;
    // ...
};

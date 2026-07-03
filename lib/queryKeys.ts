export const queryKeys = {
    appeals: ['appeals'] as const,

    verifierAppeals: ['appeals', 'verifier'] as const,

    registrarAppeals: ['appeals', 'registrar'] as const,

    appeal: (id: string) => ['appeal', id] as const,

    verifierAppeal: (id: string) => ['appeal', 'verifier', id] as const,

    registrarAppeal: (id: string) => ['appeal', 'registrar', id] as const,
};

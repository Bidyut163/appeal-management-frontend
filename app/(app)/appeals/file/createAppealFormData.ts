import { FormInput } from './schemas';

export const createAppealFormData = (data: FormInput) => {
    if (!data.appealDocument) {
        throw new Error('Appeal document is required.');
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key === 'appealDocument') return;

        formData.append(key, String(value ?? ''));
    });

    // ----------------------------------------------------------
    formData.append('appealDocument', data.appealDocument);

    return formData;
};

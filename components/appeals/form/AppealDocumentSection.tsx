import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormInput } from '@/app/(app)/appeals/file/schemas';

import { Input } from '@/components/ui/input';

interface AppealDocumentSectionProps {
    form: UseFormReturn<FormInput>;
}

export const AppealDocumentSection = ({ form }: AppealDocumentSectionProps) => {
    const selectedFile = form.watch('appealDocument');

    return (
        <>
            <hr />
            <h6>10. Please Upload Documents related to the appeal:</h6>

            <Controller
                name="appealDocument"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appealDocument">
                            Upload Appeal Documents
                        </FieldLabel>
                        <FieldDescription>
                            Upload a PDF document (Maximum size: 10 MB)
                        </FieldDescription>
                        <Input
                            id="appealDocument"
                            type="file"
                            accept="application/pdf"
                            aria-invalid={fieldState.invalid}
                            onChange={(e) => {
                                field.onChange(e.target.files?.[0]);
                            }}
                            onBlur={field.onBlur}
                            ref={field.ref}
                        />
                        {selectedFile && (
                            <p className="text-sm text-muted-foreground mt-2">
                                📄 {selectedFile.name} (
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{' '}
                                MB)
                            </p>
                        )}
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </>
    );
};

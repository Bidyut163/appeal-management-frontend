import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormInput } from '@/app/(app)/appeals/file/schemas';

import { Input } from '@/components/ui/input';
import { FileTextIcon, UploadCloudIcon } from 'lucide-react';

interface AppealDocumentSectionProps {
    form: UseFormReturn<FormInput>;
}

export const AppealDocumentSection = ({ form }: AppealDocumentSectionProps) => {
    const selectedFile = form.watch('appealDocument');

    return (
        <>
            <hr />
            <h6 className="mb-5 text-base font-semibold tracking-tight">
                10. Please Upload Documents related to the appeal:
            </h6>

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
                        <div className="relative mt-2 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 transition-colors hover:border-primary/50 hover:bg-muted/40 focus-within:border-primary">
                            <Input
                                id="appealDocument"
                                type="file"
                                accept="application/pdf"
                                aria-invalid={fieldState.invalid}
                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                onChange={(e) => {
                                    field.onChange(e.target.files?.[0]);
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                            />

                            <div className="flex min-h-36 flex-col items-center justify-center gap-3 px-6 py-7 text-center">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <UploadCloudIcon className="h-6 w-6 text-primary" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                        {selectedFile
                                            ? 'Click to replace the selected document'
                                            : 'Click to upload your document'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PDF files only · Maximum size 10 MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        {selectedFile && (
                            <div className="mt-3 flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
                                <div className="rounded-md bg-primary/10 p-2">
                                    <FileTextIcon className="h-5 w-5 text-primary" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(
                                            selectedFile.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{' '}
                                        MB
                                    </p>
                                </div>
                            </div>
                            // <p className="text-sm text-muted-foreground mt-2">
                            //     📄 {selectedFile.name} (
                            //     {(selectedFile.size / 1024 / 1024).toFixed(2)}{' '}
                            //     MB)
                            // </p>
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

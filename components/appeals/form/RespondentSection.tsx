import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';

import { Controller, UseFormReturn } from 'react-hook-form';

import { FormInput } from '@/app/(app)/appeals/file/schemas';

import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface RespondentSectionProps {
    form: UseFormReturn<FormInput>;
    editableFields?: string[];
}

const RespondentSection = ({
    form,
    editableFields,
}: RespondentSectionProps) => {
    const [isRespondentServiceAddressSame, setIsRespondentServiceAddressSame] =
        useState(false);

    const isFieldEditable = (field: string) =>
        editableFields?.includes(field) || !editableFields;

    const copyOfficeToServiceAddress = () => {
        const values = form.getValues();
        form.setValue(
            'respondentServiceAddressLine1',
            values.respondentOfficeAddressLine1,
        );

        form.setValue(
            'respondentServiceAddressLine2',
            values.respondentOfficeAddressLine2,
        );

        form.setValue(
            'respondentServiceCountry',
            values.respondentOfficeCountry,
        );

        form.setValue('respondentServiceState', values.respondentOfficeState);

        form.setValue(
            'respondentServiceDistrict',
            values.respondentOfficeDistrict,
        );

        form.setValue('respondentServiceCity', values.respondentOfficeCity);
        form.setValue(
            'respondentServiceLandmark',
            values.respondentOfficeLandmark,
        );
        form.setValue(
            'respondentServicePinCode',
            values.respondentOfficePinCode,
        );
    };
    return (
        <>
            <hr />
            <h6>2. Particulars of the Respondent</h6>

            <Controller
                name="respondentName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentName">
                            Name of the Respondent
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentName"
                            aria-invalid={fieldState.invalid}
                            placeholder="Name of the respondent"
                            disabled={!isFieldEditable('respondentName')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* Respondent Office Address */}

            <p className="font-semibold">Official Address of the Respondent</p>
            <Controller
                name="respondentOfficeAddressLine1"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentOfficeAddressLine1">
                            Address line 1
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentOfficeAddressLine1"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 1"
                            disabled={
                                !isFieldEditable('respondentOfficeAddressLine1')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="respondentOfficeAddressLine2"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentOfficeAddressLine2">
                            Address line 2
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentOfficeAddressLine2"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 2"
                            disabled={
                                !isFieldEditable('respondentOfficeAddressLine2')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="flex gap-4">
                <Controller
                    name="respondentOfficeCountry"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficeCountry">
                                Country
                            </FieldLabel>

                            <Input
                                {...field}
                                readOnly
                                disabled={
                                    !isFieldEditable('respondentOfficeCountry')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentOfficeState"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficeState">
                                State
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentOfficeState"
                                aria-invalid={fieldState.invalid}
                                placeholder="State"
                                disabled={
                                    !isFieldEditable('respondentOfficeState')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <Controller
                    name="respondentOfficeDistrict"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficeDistrict">
                                District
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentOfficeDistrict"
                                aria-invalid={fieldState.invalid}
                                placeholder="District"
                                disabled={
                                    !isFieldEditable('respondentOfficeDistrict')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentOfficeCity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficeCity">
                                City
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentOfficeCity"
                                aria-invalid={fieldState.invalid}
                                placeholder="City"
                                disabled={
                                    !isFieldEditable('respondentOfficeCity')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <Controller
                    name="respondentOfficeLandmark"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficeLandmark">
                                Landmark/region
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentOfficeLandmark"
                                aria-invalid={fieldState.invalid}
                                placeholder="Landmark/region"
                                disabled={
                                    !isFieldEditable('respondentOfficeLandmark')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentOfficePinCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentOfficePinCode">
                                Zip/Pin code
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentOfficePinCode"
                                aria-invalid={fieldState.invalid}
                                placeholder="Zip/Pin code"
                                disabled={
                                    !isFieldEditable('respondentOfficePinCode')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <hr />
            {/* checkbox to check if address same */}

            <FieldGroup>
                <Field orientation="horizontal">
                    <Checkbox
                        checked={isRespondentServiceAddressSame}
                        onCheckedChange={(checked) => {
                            setIsRespondentServiceAddressSame(checked === true);

                            if (checked) {
                                copyOfficeToServiceAddress();
                            }
                        }}
                        id="isRespondentServiceAddressSame"
                        name="isRespondentServiceAddressSame"
                    />
                    <FieldLabel htmlFor="isRespondentServiceAddressSame">
                        Is respondent service address same as Office address?
                    </FieldLabel>
                </Field>
            </FieldGroup>
            {/* Respondent Service Address */}

            <p className="font-semibold">Address for Service of all Notices</p>
            <Controller
                name="respondentServiceAddressLine1"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentServiceAddressLine1">
                            Address line 1
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentServiceAddressLine1"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 1"
                            disabled={
                                isRespondentServiceAddressSame ||
                                !isFieldEditable(
                                    'respondentServiceAddressLine1',
                                )
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="respondentServiceAddressLine2"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentServiceAddressLine2">
                            Address line 2
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentServiceAddressLine2"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 2"
                            disabled={
                                isRespondentServiceAddressSame ||
                                !isFieldEditable(
                                    'respondentServiceAddressLine2',
                                )
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <div className="flex gap-4">
                <Controller
                    name="respondentServiceCountry"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServiceCountry">
                                Country
                            </FieldLabel>

                            <Input
                                {...field}
                                readOnly
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable('respondentServiceCountry')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentServiceState"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServiceState">
                                State
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentServiceState"
                                aria-invalid={fieldState.invalid}
                                placeholder="State"
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable('respondentServiceState')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <Controller
                    name="respondentServiceDistrict"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServiceDistrict">
                                District
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentServiceDistrict"
                                aria-invalid={fieldState.invalid}
                                placeholder="District"
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable(
                                        'respondentServiceDistrict',
                                    )
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentServiceCity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServiceCity">
                                City
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentServiceCity"
                                aria-invalid={fieldState.invalid}
                                placeholder="City"
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable('respondentServiceCity')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <Controller
                    name="respondentServiceLandmark"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServiceLandmark">
                                Landmark/region
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentServiceLandmark"
                                aria-invalid={fieldState.invalid}
                                placeholder="Landmark/region"
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable(
                                        'respondentServiceLandmark',
                                    )
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="respondentServicePinCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="respondentServicePinCode">
                                Zip/Pin code
                            </FieldLabel>

                            <Input
                                {...field}
                                id="respondentServicePinCode"
                                aria-invalid={fieldState.invalid}
                                placeholder="Zip/Pin code"
                                disabled={
                                    isRespondentServiceAddressSame ||
                                    !isFieldEditable('respondentServicePinCode')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <hr />
            <p className="font-semibold">Respondent Contact Details</p>

            <Controller
                name="respondentMobileNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentMobileNumber">
                            Phone/Mobile
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentMobileNumber"
                            aria-invalid={fieldState.invalid}
                            placeholder="Phone/Mobile"
                            disabled={
                                !isFieldEditable('respondentMobileNumber')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="respondentEmailAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="respondentEmailAddress">
                            Email Address
                        </FieldLabel>

                        <Input
                            {...field}
                            id="respondentEmailAddress"
                            aria-invalid={fieldState.invalid}
                            placeholder="Email Address"
                            disabled={
                                !isFieldEditable('respondentEmailAddress')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
        </>
    );
};
export default RespondentSection;

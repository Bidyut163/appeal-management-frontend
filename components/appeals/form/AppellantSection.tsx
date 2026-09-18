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

interface AppellantSectionProps {
    form: UseFormReturn<FormInput>;
    editableFields?: string[];
}

export const AppellantSection = ({
    form,
    editableFields,
}: AppellantSectionProps) => {
    const [isAppellantServiceAddressSame, setIsAppellantServiceAddressSame] =
        useState(false);

    const isFieldEditable = (field: string) =>
        editableFields?.includes(field) || !editableFields;

    const copyResidentialToServiceAddress = () => {
        const values = form.getValues();
        form.setValue(
            'appellantServiceAddressLine1',
            values.appellantResidentialAddressLine1,
        );

        form.setValue(
            'appellantServiceAddressLine2',
            values.appellantResidentialAddressLine2,
        );

        form.setValue(
            'appellantServiceCountry',
            values.appellantResidentialCountry,
        );

        form.setValue(
            'appellantServiceState',
            values.appellantResidentialState,
        );

        form.setValue(
            'appellantServiceDistrict',
            values.appellantResidentialDistrict,
        );

        form.setValue('appellantServiceCity', values.appellantResidentialCity);
        form.setValue(
            'appellantServiceLandmark',
            values.appellantResidentialLandmark,
        );
        form.setValue(
            'appellantServicePinCode',
            values.appellantResidentialPinCode,
        );
    };

    return (
        <>
            <h6>1. Particulars of the Appellant</h6>

            <Controller
                name="appellantName"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantName">
                            Name of the Appellant
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantName"
                            aria-invalid={fieldState.invalid}
                            placeholder="Name of the appellant"
                            disabled={!isFieldEditable('appellantName')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            {/* Appellant Residential Address */}

            <p className="font-semibold">
                Address of the Existing Office/ Residence of the Appellant
            </p>
            <Controller
                name="appellantResidentialAddressLine1"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantResidentialAddressLine1">
                            Address line 1
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantResidentialAddressLine1"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 1"
                            disabled={
                                !isFieldEditable(
                                    'appellantResidentialAddressLine1',
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
                name="appellantResidentialAddressLine2"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantResidentialAddressLine2">
                            Address line 2
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantResidentialAddressLine2"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 2"
                            disabled={
                                !isFieldEditable(
                                    'appellantResidentialAddressLine2',
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
                    name="appellantResidentialCountry"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialCountry">
                                Country
                            </FieldLabel>

                            <Input
                                {...field}
                                readOnly
                                disabled={
                                    !isFieldEditable(
                                        'appellantResidentialCountry',
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
                    name="appellantResidentialState"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialState">
                                State
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantResidentialState"
                                aria-invalid={fieldState.invalid}
                                placeholder="State"
                                disabled={
                                    !isFieldEditable(
                                        'appellantResidentialState',
                                    )
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
                    name="appellantResidentialDistrict"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialDistrict">
                                District
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantResidentialDistrict"
                                aria-invalid={fieldState.invalid}
                                placeholder="District"
                                disabled={
                                    !isFieldEditable(
                                        'appellantResidentialDistrict',
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
                    name="appellantResidentialCity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialCity">
                                City
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantResidentialCity"
                                aria-invalid={fieldState.invalid}
                                placeholder="City"
                                disabled={
                                    !isFieldEditable('appellantResidentialCity')
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
                    name="appellantResidentialLandmark"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialLandmark">
                                Landmark/region
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantResidentialLandmark"
                                aria-invalid={fieldState.invalid}
                                placeholder="Landmark/region"
                                disabled={
                                    !isFieldEditable(
                                        'appellantResidentialLandmark',
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
                    name="appellantResidentialPinCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantResidentialPinCode">
                                Zip/Pin code
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantResidentialPinCode"
                                aria-invalid={fieldState.invalid}
                                placeholder="Zip/Pin code"
                                disabled={
                                    !isFieldEditable(
                                        'appellantResidentialPinCode',
                                    )
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
                        checked={isAppellantServiceAddressSame}
                        onCheckedChange={(checked) => {
                            setIsAppellantServiceAddressSame(checked === true);

                            if (checked) {
                                copyResidentialToServiceAddress();
                            }
                        }}
                        id="isAppellantServiceAddressSame"
                        name="isAppellantServiceAddressSame"
                    />
                    <FieldLabel htmlFor="isAppellantServiceAddressSame">
                        Is service address same as residential address?
                    </FieldLabel>
                </Field>
            </FieldGroup>
            {/* Appellant Service Address */}

            <p className="font-semibold">Address for Service of all Notices</p>
            <Controller
                name="appellantServiceAddressLine1"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantServiceAddressLine1">
                            Address line 1
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantServiceAddressLine1"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 1"
                            disabled={
                                isAppellantServiceAddressSame ||
                                !isFieldEditable('appellantServiceAddressLine1')
                            }
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                name="appellantServiceAddressLine2"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantServiceAddressLine2">
                            Address line 2
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantServiceAddressLine2"
                            aria-invalid={fieldState.invalid}
                            placeholder="Address line 2"
                            disabled={
                                isAppellantServiceAddressSame ||
                                !isFieldEditable('appellantServiceAddressLine2')
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
                    name="appellantServiceCountry"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServiceCountry">
                                Country
                            </FieldLabel>

                            <Input
                                {...field}
                                readOnly
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServiceCountry')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="appellantServiceState"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServiceState">
                                State
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantServiceState"
                                aria-invalid={fieldState.invalid}
                                placeholder="State"
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServiceState')
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
                    name="appellantServiceDistrict"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServiceDistrict">
                                District
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantServiceDistrict"
                                aria-invalid={fieldState.invalid}
                                placeholder="District"
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServiceDistrict')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="appellantServiceCity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServiceCity">
                                City
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantServiceCity"
                                aria-invalid={fieldState.invalid}
                                placeholder="City"
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServiceCity')
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
                    name="appellantServiceLandmark"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServiceLandmark">
                                Landmark/region
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantServiceLandmark"
                                aria-invalid={fieldState.invalid}
                                placeholder="Landmark/region"
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServiceLandmark')
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="appellantServicePinCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="appellantServicePinCode">
                                Zip/Pin code
                            </FieldLabel>

                            <Input
                                {...field}
                                id="appellantServicePinCode"
                                aria-invalid={fieldState.invalid}
                                placeholder="Zip/Pin code"
                                disabled={
                                    isAppellantServiceAddressSame ||
                                    !isFieldEditable('appellantServicePinCode')
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
            <p className="font-semibold">Appellant Contact Details</p>

            <Controller
                name="appellantMobileNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantMobileNumber">
                            Phone/Mobile
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantMobileNumber"
                            aria-invalid={fieldState.invalid}
                            placeholder="Phone/Mobile"
                            disabled={!isFieldEditable('appellantMobileNumber')}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="appellantEmailAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="appellantEmailAddress">
                            Email Address
                        </FieldLabel>

                        <Input
                            {...field}
                            id="appellantEmailAddress"
                            aria-invalid={fieldState.invalid}
                            placeholder="Email Address"
                            disabled={!isFieldEditable('appellantEmailAddress')}
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

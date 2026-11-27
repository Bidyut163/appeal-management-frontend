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
        <div className="space-y-8">
            <section className="space-y-5">
                <div className="border-b pb-3">
                    <h3 className="text-base font-semibold tracking-tight">
                        1. Particulars of the Appellant
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Enter the appellant&apos;s personal and residential
                        details.
                    </p>
                </div>

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
                <div className="rounded-lg border bg-muted/20 p-5 space-y-5">
                    {/* <p className="font-semibold">
                    Address of the Existing Office/ Residence of the Appellant
                </p> */}
                    <div>
                        <h4 className="text-sm font-semibold">
                            Residential / Office Address
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Provide the appellant&apos;s current residential or
                            office address.
                        </p>
                    </div>
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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                            !isFieldEditable(
                                                'appellantResidentialCity',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>

                <div className="rounded-lg border bg-muted/20 p-5 space-y-5">
                    <div>
                        <h4 className="text-sm font-semibold">
                            Address for Service of Notices
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Provide the address where official notices should be
                            delivered.
                        </p>
                    </div>

                    {/* checkbox to check if address same */}

                    <div className="flex items-start gap-3 rounded-md border bg-background p-4">
                        <FieldGroup>
                            <Field orientation="horizontal">
                                <Checkbox
                                    checked={isAppellantServiceAddressSame}
                                    onCheckedChange={(checked) => {
                                        setIsAppellantServiceAddressSame(
                                            checked === true,
                                        );

                                        if (checked) {
                                            copyResidentialToServiceAddress();
                                        }
                                    }}
                                    id="isAppellantServiceAddressSame"
                                    name="isAppellantServiceAddressSame"
                                />
                                <div className="space-y-1">
                                    <FieldLabel
                                        htmlFor="isAppellantServiceAddressSame"
                                        className="cursor-pointer"
                                    >
                                        Is service address same as residential
                                        address?
                                    </FieldLabel>
                                    <p className="text-xs text-muted-foreground">
                                        Use the residential address above for
                                        receiving official notices.
                                    </p>
                                </div>
                            </Field>
                        </FieldGroup>
                    </div>
                    {/* Appellant Service Address */}

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
                                        !isFieldEditable(
                                            'appellantServiceAddressLine1',
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
                                        !isFieldEditable(
                                            'appellantServiceAddressLine2',
                                        )
                                    }
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                            !isFieldEditable(
                                                'appellantServiceCountry',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                            !isFieldEditable(
                                                'appellantServiceState',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                            !isFieldEditable(
                                                'appellantServiceDistrict',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                            !isFieldEditable(
                                                'appellantServiceCity',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                            !isFieldEditable(
                                                'appellantServiceLandmark',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                            !isFieldEditable(
                                                'appellantServicePinCode',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>

                <div className="rounded-lg border p-5 space-y-5">
                    <div>
                        <h4 className="text-sm font-semibold">
                            Contact Details
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Provide contact information for communication
                            regarding this appeal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                        disabled={
                                            !isFieldEditable(
                                                'appellantMobileNumber',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
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
                                        disabled={
                                            !isFieldEditable(
                                                'appellantEmailAddress',
                                            )
                                        }
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

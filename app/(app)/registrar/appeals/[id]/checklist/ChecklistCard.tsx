import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import {
    UpdateAppealScrutinyInput,
    UpdateAppealScrutinyOutput,
} from '../schemas';
import { UseMutationResult } from '@tanstack/react-query';
import { BooleanRadioField } from '@/app/(app)/registrar/appeals/[id]/checklist/BooleanRadioField';

import { DateField } from '@/app/(app)/registrar/appeals/[id]/checklist/DateField';
import { Textarea } from '@/components/ui/textarea';
import type { AppealDetail } from '@/types/appeal';

interface ChecklistCardProps {
    form: UseFormReturn<
        UpdateAppealScrutinyInput,
        unknown,
        UpdateAppealScrutinyOutput
    >;
    appeal: AppealDetail;
    createChecklistMutation: UseMutationResult<
        unknown,
        Error,
        UpdateAppealScrutinyOutput
    >;
}

export default function ChecklistCard({
    form,
    appeal,
    createChecklistMutation,
}: ChecklistCardProps) {
    const handleSubmitChecklist = (data: UpdateAppealScrutinyOutput) => {
        createChecklistMutation.mutate(data);
    };

    const isHardCopySubmissionDelayed = useWatch({
        control: form.control,
        name: 'isHardCopySubmissionDelayed',
    });

    const isAppealFilingDelayed = useWatch({
        control: form.control,
        name: 'isAppealFilingDelayed',
    });

    const isCondonationApplicationFiled = useWatch({
        control: form.control,
        name: 'isCondonationApplicationFiled',
    });

    const areFeesPaid = useWatch({
        control: form.control,
        name: 'areFeesPaid',
    });

    const areDocumentsFiledWithIndexPagination = useWatch({
        control: form.control,
        name: 'areDocumentsFiledWithIndexPagination',
    });

    return (
        <Card className="mt-4 max-w-4xl">
            <CardHeader>
                <CardTitle className="text-center">FORM A</CardTitle>
                <CardDescription className="text-center">
                    CHECKLIST FOR SCRUTINY OF APPEAL
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="checklist-form"
                    className="flex flex-col gap-4"
                    // onSubmit={form.handleSubmit(onSubmit)}
                    onSubmit={form.handleSubmit(handleSubmitChecklist)}
                >
                    <FieldGroup>
                        <div className="flex gap-4">
                            <Controller
                                name="appealNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="appealNumber">
                                            Appeal No.
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            {...field}
                                            id="appealNumber"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Appeal Number"
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
                                name="complaintNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="complaintNumber">
                                            Complaint No.
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            {...field}
                                            id="complaintNumber"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Complaint No."
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

                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Parties</span>

                            <span className="flex-1 border-b pb-1">
                                {appeal.appellantName}
                            </span>

                            <span className="font-semibold">vs.</span>

                            <span className="flex-1 border-b pb-1">
                                {appeal.respondentName}
                            </span>
                        </div>
                        <hr />
                        <Controller
                            name="legalProvision"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="legalProvision">
                                        1. Legal provisions: U/sec. of RERA Act
                                    </FieldLabel>
                                    <Input
                                        type="text"
                                        {...field}
                                        id="legalProvision"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Section Number"
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
                            name="isAppealCompetent"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isAppealCompetent"
                                    label="2. Whether the appeal is competent."
                                />
                            )}
                        />
                        <Controller
                            name="arePartiesAndAddressesProper"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="arePartiesAndAddressesProper"
                                    label="3. Whether the name of the parties and their addresses are 
                                        properly mentioned in the Appeal Memo"
                                />
                            )}
                        />
                        <Controller
                            name="isCertifiedCopyFiled"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isCertifiedCopyFiled"
                                    label="3. Whether certified copy of the impugned Order/Judgment is filed with the appeal."
                                />
                            )}
                        />

                        <FieldLabel>5. What is the :</FieldLabel>
                        <Controller
                            name="orderDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="orderDate"
                                    label="a. Date of the order:"
                                />
                            )}
                        />

                        <Controller
                            name="communicationDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="communicationDate"
                                    label="b. Date of its communication to the party by RERA:"
                                />
                            )}
                        />
                        <Controller
                            name="certifiedCopyApplicationDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="certifiedCopyApplicationDate"
                                    label="c. Date of application for certified copy:"
                                />
                            )}
                        />
                        <Controller
                            name="certifiedCopyReadyDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="certifiedCopyReadyDate"
                                    label="d. Date on which copy was ready:"
                                />
                            )}
                        />
                        <Controller
                            name="certifiedCopyReceiptDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="certifiedCopyReceiptDate"
                                    label="e. Date of receipt of certified coр:"
                                />
                            )}
                        />
                        <Controller
                            name="onlineFilingDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="onlineFilingDate"
                                    label="f. Date of Online filing of appeal:"
                                />
                            )}
                        />
                        <Controller
                            name="hardCopySubmissionDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <DateField
                                    field={field}
                                    fieldState={fieldState}
                                    id="hardCopySubmissionDate"
                                    label="g. Date of submission of hard copy of Appeal Memo:"
                                />
                            )}
                        />
                        <Controller
                            name="isHardCopySubmissionDelayed"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isHardCopySubmissionDelayed"
                                    label="h. Whether there is any delay in submission of hard."
                                />
                            )}
                        />

                        {isHardCopySubmissionDelayed && (
                            <Controller
                                name="hardCopyDelayDays"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="hardCopyDelayDays">
                                            If yes, how many days
                                        </FieldLabel>
                                        <Input
                                            type="number"
                                            {...field}
                                            id="hardCopyDelayDays"
                                            value={field.value ?? ''}
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.value === ''
                                                        ? undefined
                                                        : Number(
                                                              event.target
                                                                  .value,
                                                          ),
                                                )
                                            }
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Delay days"
                                            disabled={
                                                !isHardCopySubmissionDelayed
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
                        )}

                        <Controller
                            name="isAppealWithinLimitation"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isAppealWithinLimitation"
                                    label="6. Is appeal filed within limitation (60 days)(from the date of receipt of order)."
                                />
                            )}
                        />
                        <Controller
                            name="isAppealFilingDelayed"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isAppealFilingDelayed"
                                    label="7. Whether there is any delay in filing of appeal."
                                />
                            )}
                        />

                        {isAppealFilingDelayed && (
                            <Controller
                                name="appealFilingDelayDays"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="appealFilingDelayDays">
                                            If yes, how many days
                                        </FieldLabel>
                                        <Input
                                            type="number"
                                            {...field}
                                            id="appealFilingDelayDays"
                                            value={field.value ?? ''}
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.value === ''
                                                        ? undefined
                                                        : Number(
                                                              event.target
                                                                  .value,
                                                          ),
                                                )
                                            }
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Delay days"
                                            disabled={!isAppealFilingDelayed}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        )}
                        <Controller
                            name="isCondonationApplicationFiled"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isCondonationApplicationFiled"
                                    label="8. Whether application for condonation of delay is filed with appeal."
                                />
                            )}
                        />
                        {isCondonationApplicationFiled === false && (
                            <Controller
                                name="objectionForCondonationDelay"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="objectionForCondonationDelay">
                                            If not, raise its objection
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="objectionForCondonationDelay"
                                            value={field.value ?? ''}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Objection"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        )}
                        <Controller
                            name="areFeesPaid"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="areFeesPaid"
                                    label="9. Whether requisite fees paid."
                                />
                            )}
                        />
                        {areFeesPaid && (
                            <Controller
                                name="paymentDate"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <DateField
                                        field={field}
                                        fieldState={fieldState}
                                        id="paymentDate"
                                        label="If yes, date of payment:"
                                    />
                                )}
                            />
                        )}
                        <Controller
                            name="areDocumentsFiledWithIndexPagination"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="areDocumentsFiledWithIndexPagination"
                                    label="10. Whether the required documents are filed with Index & pagination."
                                />
                            )}
                        />
                        {areDocumentsFiledWithIndexPagination && (
                            <Controller
                                name="areDocumentsLegible"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <BooleanRadioField
                                        field={field}
                                        fieldState={fieldState}
                                        id="areDocumentsLegible"
                                        label="If yes, whether the documents are legible"
                                    />
                                )}
                            />
                        )}
                        <Controller
                            name="isAppealMemoAnnexedForOtherSide"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isAppealMemoAnnexedForOtherSide"
                                    label="11. (i). Whether copy of appeal memo is annexed for giving the same to other side."
                                />
                            )}
                        />
                        <Controller
                            name="isAppealMemoServedByPostCourier"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isAppealMemoServedByPostCourier"
                                    label="11. (ii). Or served to other side by post / courier."
                                />
                            )}
                        />
                        <Controller
                            name="isVakalatnamaAuthorizationProper"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isVakalatnamaAuthorizationProper"
                                    label="12. Whether Vakalatnama /Authorization is filed and properly stamped."
                                />
                            )}
                        />
                        <Controller
                            name="isContactOnRecord"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <BooleanRadioField
                                    field={field}
                                    fieldState={fieldState}
                                    id="isContactOnRecord"
                                    label="13. Whether e-mail / phone / Mobile No. is on record."
                                />
                            )}
                        />
                    </FieldGroup>

                    <Button
                        type="submit"
                        form="checklist-form"
                        // disabled={form.formState.isSubmitting}
                        disabled={createChecklistMutation.isPending}
                        className="self-start"
                    >
                        Submit checklist
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

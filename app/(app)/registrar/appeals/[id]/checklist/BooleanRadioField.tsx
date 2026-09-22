import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface BooleanRadioFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: {
        invalid: boolean;
        error?: {
            message?: string;
        };
    };
    label: string;
    id: string;
}

const options = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' },
] as const;

export function BooleanRadioField<T extends FieldValues>({
    field,
    fieldState,
    label,
    id,
}: BooleanRadioFieldProps<T>) {
    return (
        <FieldSet>
            <FieldTitle>{label}</FieldTitle>

            <RadioGroup
                name={field.name}
                value={
                    field.value === undefined ? '' : field.value ? 'yes' : 'no'
                }
                onValueChange={(value) => field.onChange(value === 'yes')}
            >
                {options.map((option) => (
                    <FieldLabel key={option.id} htmlFor={`${id}-${option.id}`}>
                        <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                        >
                            <FieldContent>
                                <FieldTitle>{option.title}</FieldTitle>
                            </FieldContent>

                            <RadioGroupItem
                                value={option.id}
                                id={`${id}-${option.id}`}
                                aria-invalid={fieldState.invalid}
                            />
                        </Field>
                    </FieldLabel>
                ))}
            </RadioGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
    );
}

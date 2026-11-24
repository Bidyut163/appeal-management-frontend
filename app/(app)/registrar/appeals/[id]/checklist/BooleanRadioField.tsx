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
        <FieldSet className="space-y-3">
            <FieldTitle className="text-sm font-medium leading-relaxed">
                {label}
            </FieldTitle>

            <RadioGroup
                name={field.name}
                value={
                    field.value === undefined ? '' : field.value ? 'yes' : 'no'
                }
                onValueChange={(value) => field.onChange(value === 'yes')}
                className="grid grid-cols-2 gap-3"
                aria-invalid={fieldState.invalid}
            >
                {options.map((option) => (
                    <FieldLabel
                        key={option.id}
                        htmlFor={`${id}-${option.id}`}
                        className="cursor-pointer"
                    >
                        <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                            className="min-h-11 rounded-lg border px-4 py-3 transition-colors hover:bg-muted/50  has-checked:border-primary has-checked:bg-primary/5"
                        >
                            <FieldContent>
                                <FieldTitle className="font-medium">
                                    {option.title}
                                </FieldTitle>
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

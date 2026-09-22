import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarCheckIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface DateFieldProps<T extends FieldValues> {
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

export function DateField<T extends FieldValues>({
    field,
    fieldState,
    label,
    id,
}: DateFieldProps<T>) {
    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        className="justify-between font-normal pr-1"
                    >
                        {field.value ? (
                            format(field.value, 'PPP')
                        ) : (
                            <span>Select date</span>
                        )}

                        <CalendarCheckIcon />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                        fixedWeeks
                        weekStartsOn={1}
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}

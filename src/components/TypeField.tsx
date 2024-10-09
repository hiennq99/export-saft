import { EXPORT_SAFT_TYPE_OPTIONS, ExportSaftPeriod } from '@/lib/constant';
import { ExportSaftSchema } from '@/lib/schema';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export const TypeField = () => {
  const { control } = useFormContext<ExportSaftSchema>();

  const { field: periodField } = useController({
    control,
    name: 'period',
  });

  const { field: monthField } = useController({
    control,
    name: 'month',
  });

  const { field: weekField } = useController({
    control,
    name: 'week',
  });

  const { field: dayField } = useController({
    control,
    name: 'day',
  });

  const onChange = (value: string, field: FieldValues) => {
    field.onChange(value);
    periodField.onChange(ExportSaftPeriod.YEAR);
    monthField.onChange('');
    weekField.onChange('');
    dayField.onChange('');
  };

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-label text-sm font-medium">
            What document do you want to export?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => onChange(value, field)}
              defaultValue={field.value}
              className="flex flex-col md:flex-row flex-wrap md:space-x-2"
            >
              {EXPORT_SAFT_TYPE_OPTIONS.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal text-xs">
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

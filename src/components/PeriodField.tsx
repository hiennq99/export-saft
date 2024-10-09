import { cn } from '@/lib/utils';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import {
  EXPORT_SAFT_PERIOD_OPTIONS,
  ExportSaftPeriod,
  ExportSaftType,
} from '../lib/constant';
import { type ExportSaftSchema } from '../lib/schema';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export const PeriodField = () => {
  const { control, watch } = useFormContext<ExportSaftSchema>();
  const type = watch('type');

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
    monthField.onChange('');
    weekField.onChange('');
    dayField.onChange('');
  };

  return (
    <FormField
      control={control}
      name="period"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-label text-sm font-medium">
            What period do you want to export?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => onChange(value, field)}
              defaultValue={field.value}
              value={field.value}
              className="flex flex-col md:flex-row flex-wrap md:space-x-2"
            >
              {EXPORT_SAFT_PERIOD_OPTIONS.map((option) => {
                const isHidden =
                  type === ExportSaftType.GUIDES &&
                  [ExportSaftPeriod.WEEK, ExportSaftPeriod.DAY].includes(
                    option.value
                  );

                return (
                  <FormItem
                    key={option.value}
                    className={cn(
                      'flex items-center space-x-3 space-y-0',
                      isHidden && 'hidden'
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

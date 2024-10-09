import { ExportSaftPeriod, MONTH_OPTIONS } from '@/lib/constant';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useFormContext } from 'react-hook-form';
import { ExportSaftSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';

export const MonthField = () => {
  const { control, watch } = useFormContext<ExportSaftSchema>();
  const period = watch('period');
  const showMonth = period !== ExportSaftPeriod.YEAR;

  return (
    <FormField
      control={control}
      name="month"
      render={({ field }) => (
        <FormItem className={cn('space-y-1', !showMonth && 'hidden')}>
          <FormLabel className="text-label text-sm font-medium">
            What month?
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>
              <SelectContent>
                {MONTH_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

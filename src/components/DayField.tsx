import { cn, getDaysInMonth } from '@/lib/utils';
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
import { useMemo } from 'react';
import { ExportSaftPeriod, ExportSaftType } from '@/lib/constant';
import { useFormContext } from 'react-hook-form';
import { ExportSaftSchema } from '@/lib/schema';

export const DayField = () => {
  const { control, watch } = useFormContext<ExportSaftSchema>();
  const period = watch('period');
  const type = watch('type');
  const year = watch('year');
  const month = watch('month');

  const showDay =
    period === ExportSaftPeriod.DAY && type === ExportSaftType.ALL;

  const daysInMonth = useMemo(() => {
    if (!month) return [];

    return getDaysInMonth(parseInt(year), parseInt(month, 10));
  }, [year, month, period]);

  return (
    <FormField
      control={control}
      name="day"
      render={({ field }) => (
        <FormItem className={cn('space-y-1', !showDay && 'hidden')}>
          <FormLabel className="text-label text-sm font-medium">
            What day?
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Daily" />
              </SelectTrigger>
              <SelectContent>
                {daysInMonth.map((day, index) => (
                  <SelectItem key={day} value={day.toString()}>
                    {index + 1}
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

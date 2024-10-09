import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import dayjs from 'dayjs';
import { cn, getWeekRanges } from '@/lib/utils';
import { ExportSaftPeriod, ExportSaftType } from '@/lib/constant';
import { useMemo } from 'react';

export const WeekField = () => {
  const { control, watch } = useFormContext();
  const period = watch('period');
  const type = watch('type');
  const year = watch('year');
  const month = watch('month');

  const monthName = dayjs(
    new Date(parseInt(year), parseInt(month, 10) - 1)
  ).format('MMMM');

  const showWeek =
    period === ExportSaftPeriod.WEEK && type === ExportSaftType.ALL;

  const weeksInMonth = useMemo(() => {
    if (!month) return [];
    return getWeekRanges(parseInt(year), parseInt(month, 10) - 1);
  }, [year, month, period]);

  return (
    <FormField
      control={control}
      name="week"
      render={({ field }) => (
        <FormItem className={cn('space-y-1', !showWeek && 'hidden')}>
          <FormLabel className="text-label text-sm font-medium">
            What week?
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                {weeksInMonth.map((week) => {
                  return (
                    <SelectItem key={week[0]} value={week[0].toString()}>
                      {week.length === 1
                        ? week[0]
                        : `${week[0]} to ${week[week.length - 1]}`}{' '}
                      of {month && `${monthName}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

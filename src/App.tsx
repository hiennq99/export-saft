import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { exportSaft } from './api';
import { DialogMessage } from './components/DialogMessage';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import {
  EXPORT_SAFT_PERIOD_OPTIONS,
  EXPORT_SAFT_TYPE_OPTIONS,
  EXPORT_SAFT_VERSION,
  ExportSaftPeriod,
  ExportSaftType,
  MONTH_OPTIONS,
} from './lib/constant';
import { exportSaftSchema, type ExportSaftSchema } from './lib/schema';
import { cn, getCurrentYear, getDaysInMonth, getWeekRanges } from './lib/utils';

function App() {
  const [message, setMessage] = useState('');
  const form = useForm<ExportSaftSchema>({
    resolver: zodResolver(exportSaftSchema),
    defaultValues: {
      type: ExportSaftType.ALL,
      period: ExportSaftPeriod.YEAR,
      year: getCurrentYear().toString(),
      month: '',
      week: '',
      day: '',
      isOnlyBilling: true,
    },
  });

  const type = form.watch('type');
  const period = form.watch('period');
  const year = form.watch('year');
  const month = form.watch('month');

  const showMonth = period !== ExportSaftPeriod.YEAR;
  const showWeek =
    period === ExportSaftPeriod.WEEK && type === ExportSaftType.ALL;
  const showDay =
    period === ExportSaftPeriod.DAY && type === ExportSaftType.ALL;

  const daysInMonth = useMemo(() => {
    if (!month) return [];

    return getDaysInMonth(parseInt(year), parseInt(month, 10));
  }, [year, month, period]);

  const weeksInMonth = useMemo(() => {
    if (!month) return [];
    return getWeekRanges(parseInt(year), parseInt(month, 10));
  }, [year, month, period]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setMessage('');
    }
  };

  const onSubmit = async (payload: ExportSaftSchema) => {
    try {
      if (payload.period === ExportSaftPeriod.WEEK) {
        payload.day = payload.week;
      }
      delete payload.week;
      if (payload.period === ExportSaftPeriod.MONTH) {
        delete payload.day;
        delete payload.week;
      }

      const data = await exportSaft(payload);
      const message = _.get(data, 'message', '');
      const [label, email] = message.split(':');

      setMessage(
        `${label}: <a class="text-primary font-bold" href="mailto:${email}">${email}</a>`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(_.get(error, 'response.data.errors.[0].error', ''));
      }
    }
  };

  return (
    <div className="container max-w-screen-md mx-auto p-6">
      <DialogMessage
        open={!!message}
        onOpenChange={onOpenChange}
        message={message}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-10"
        >
          <div className="space-y-1">
            <h1 className="text-[32px] font-normal text-gray-600">
              Export SAFT
            </h1>
            <p className="text-neutral-500">Export your SAFT file here.</p>
          </div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-label text-sm font-medium">
                  What document do you want to export?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
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

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-label text-sm font-medium">
                  What period do you want to export?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-label text-sm font-medium">
                      What year?
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Yearly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={getCurrentYear().toString()}>
                            {getCurrentYear()}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
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
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Weekly" />
                        </SelectTrigger>
                        <SelectContent>
                          {weeksInMonth.map((week) => {
                            return (
                              <SelectItem
                                key={week[0]}
                                value={week[0].toString()}
                              >
                                {week[0]} to {week[week.length - 1]} of{' '}
                                {month &&
                                  dayjs()
                                    .month(parseInt(month) - 1)
                                    .format('MMMM')}
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

              <FormField
                control={form.control}
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
            </div>
            <FormField
              control={form.control}
              name="isOnlyBilling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Include only billing documents and exclude quotes
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-8 md:pt-8">
            <div className="flex flex-col">
              <h6 className="text-primary underline cursor-pointer text-sm">
                Download the last generated SAF-T file
              </h6>
              <p className="text-xs text-label">{EXPORT_SAFT_VERSION[type]}</p>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{' '}
                  Generating...
                </span>
              ) : (
                'Generate SAF-T'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default App;

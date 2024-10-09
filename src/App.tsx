import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import _ from 'lodash';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { exportSaft } from './api';
import { DayField } from './components/DayField';
import { DialogMessage } from './components/DialogMessage';
import { MonthField } from './components/MonthField';
import { PeriodField } from './components/PeriodField';
import { TypeField } from './components/TypeField';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from './components/ui/form';
import { WeekField } from './components/WeekField';
import { YearField } from './components/YearField';
import {
  EXPORT_SAFT_VERSION,
  ExportSaftPeriod,
  ExportSaftType,
} from './lib/constant';
import { exportSaftSchema, type ExportSaftSchema } from './lib/schema';
import { getCurrentYear } from './lib/utils';

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
          <TypeField />
          <PeriodField />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <YearField />
              <MonthField />
              <WeekField />
              <DayField />
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

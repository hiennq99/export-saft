import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { exportSaftSchema, type ExportSaftSchema } from './lib/schema';
import { Button } from './components/ui/button';

function App() {
  const form = useForm<ExportSaftSchema>({
    resolver: zodResolver(exportSaftSchema),
    defaultValues: {
      documentType: 'INVOICING_ESTIMATE',
      period: 'weekly',
      year: '',
      month: '',
      day: '01',
      isOnlyBilling: false,
    },
  });

  const onSubmit = (data: ExportSaftSchema) => {
    console.log(data);
  };

  return (
    <div className="container max-w-screen-md mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="space-y-1">
            <h1 className="text-2xl font-medium text-gray-600">Export SAFT</h1>
            <p className="text-sm text-gray-700">Export your SAFT file here.</p>
          </div>
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-label text-sm font-medium">
                  What document do you want to export?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="INVOICING_ESTIMATE" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Invoicing and Estimates
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="SHIPPING_TRANSPORT_RETURN_GUIDES" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Shipping, Transport and Return Guides
                      </FormLabel>
                    </FormItem>
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
              <FormItem className="space-y-1">
                <FormLabel className="text-label text-sm font-medium">
                  What period do you want to export?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="annual" />
                      </FormControl>
                      <FormLabel className="font-normal">Annual</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">Monthly</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekly" />
                      </FormControl>
                      <FormLabel className="font-normal">Weekly</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="daily" />
                      </FormControl>
                      <FormLabel className="font-normal">Daily</FormLabel>
                    </FormItem>
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
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Yearly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
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
                  <FormItem className="space-y-1">
                    <FormLabel className="text-label text-sm font-medium">
                      What month?
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Monthly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">January</SelectItem>
                          <SelectItem value="02">February</SelectItem>
                          <SelectItem value="03">March</SelectItem>
                          <SelectItem value="04">April</SelectItem>
                          <SelectItem value="05">May</SelectItem>
                          <SelectItem value="06">June</SelectItem>
                          <SelectItem value="07">July</SelectItem>
                          <SelectItem value="08">August</SelectItem>
                          <SelectItem value="09">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-label text-sm font-medium">
                      What day?
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">1</SelectItem>
                          <SelectItem value="02">2</SelectItem>
                          <SelectItem value="03">3</SelectItem>
                          <SelectItem value="04">4</SelectItem>
                          <SelectItem value="05">5</SelectItem>
                          <SelectItem value="06">6</SelectItem>
                          <SelectItem value="07">7</SelectItem>
                          <SelectItem value="08">8</SelectItem>
                          <SelectItem value="09">9</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="13">13</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="17">17</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="19">19</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                          <SelectItem value="23">23</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="26">26</SelectItem>
                          <SelectItem value="27">27</SelectItem>
                          <SelectItem value="28">28</SelectItem>
                          <SelectItem value="29">29</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="31">31</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
          <div className="flex justify-end gap-4">
            <div>
              <h6 className="text-primary underline cursor-pointer text-sm">
                Download the last generated SAF-T file
              </h6>
              <p className="text-xs text-label">
                SAF-T version portaria no 302/2016 (version 1.04_01).
              </p>
            </div>
            <Button type="submit">Generate SAF-T</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default App;

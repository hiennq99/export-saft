import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { ExportSaftSchema } from '@/lib/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { getCurrentYear } from '@/lib/utils';

export const YearField = () => {
  const { control } = useFormContext<ExportSaftSchema>();

  return (
    <FormField
      control={control}
      name="year"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-label text-sm font-medium">
            What year?
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
};

import { z } from 'zod';
import { ExportSaftPeriod, ExportSaftType } from './constant';

export const exportSaftSchema = z
  .object({
    type: z.enum([ExportSaftType.ALL, ExportSaftType.GUIDES]),
    period: z.enum([
      ExportSaftPeriod.YEAR,
      ExportSaftPeriod.MONTH,
      ExportSaftPeriod.WEEK,
      ExportSaftPeriod.DAY,
    ]),
    year: z.string().min(4),
    month: z.string().optional(),
    week: z.string().optional(),
    day: z.string().optional(),
    isOnlyBilling: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === ExportSaftType.GUIDES &&
      ![ExportSaftPeriod.YEAR, ExportSaftPeriod.MONTH].includes(data.period)
    ) {
      ctx.addIssue({
        path: ['period'],
        code: z.ZodIssueCode.custom,
        message: 'Period must be Annual or Monthly when type is guides',
      });
    }

    if (data.period === ExportSaftPeriod.MONTH && !data.month) {
      ctx.addIssue({
        path: ['month'],
        code: z.ZodIssueCode.custom,
        message: 'Month is required when period is month',
      });
    }

    if (data.period === ExportSaftPeriod.WEEK && !data.week) {
      ctx.addIssue({
        path: ['week'],
        code: z.ZodIssueCode.custom,
        message: 'Week is required when period is week',
      });
    }

    if (data.period === ExportSaftPeriod.DAY && !data.day) {
      ctx.addIssue({
        path: ['day'],
        code: z.ZodIssueCode.custom,
        message: 'Day is required when period is day',
      });
    }
  });
export type ExportSaftSchema = z.infer<typeof exportSaftSchema>;

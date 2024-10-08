import { z } from 'zod';

export const exportSaftSchema = z.object({
  documentType: z.enum([
    'INVOICING_ESTIMATE',
    'SHIPPING_TRANSPORT_RETURN_GUIDES',
  ]),
  period: z.enum(['annual', 'monthly', 'weekly', 'daily']),
  year: z.string().min(4),
  month: z.string().min(2),
  day: z.string().min(2),
  isOnlyBilling: z.boolean(),
});

export type ExportSaftSchema = z.infer<typeof exportSaftSchema>;

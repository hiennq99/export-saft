import { axiosInstance } from '@/lib/axios';
import { ExportSaftSchema } from '@/lib/schema';

export const exportSaft = async (data: ExportSaftSchema) => {
  return axiosInstance.post('/export-saft', { ...data, web: true });
};

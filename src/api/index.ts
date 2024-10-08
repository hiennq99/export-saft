import { axiosInstance } from '@/lib/axios';
import { ExportSaftSchema } from '@/lib/schema';

export const exportSaft = async (data: ExportSaftSchema) => {
  return axiosInstance.get('/export-saft', { params: { ...data, web: true } });
};

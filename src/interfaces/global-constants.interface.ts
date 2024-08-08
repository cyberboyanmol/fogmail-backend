import { HttpStatusCode, HttpStatusKeys } from '@/enums';
// Define an interface for the status object
export interface Status {
  success: string;
  failed: string;
}

// Define an interface for the globalConstants object
export interface GlobalConstants {
  status: Status;
  httpStatus: Record<keyof typeof HttpStatusKeys, { name: string; code: HttpStatusCode }>;
}

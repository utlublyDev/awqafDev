import dayjs from "dayjs";

export interface INotification {
  id?: number;
  details?: string | null;
  userIdAwqaf?: string;
  contractId?: string;
  sentDate?: string | null;
  date?: string | null;
}

export const defaultValue: Readonly<INotification> = {};

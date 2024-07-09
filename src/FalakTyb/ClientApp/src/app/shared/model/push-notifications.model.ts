import dayjs from "dayjs";

export interface IPushNotifications {
  id?: number;
  header?: string;
  details?: string | null;
  sentBy?: string | null;
  sentDate?: string | null;
}

export const defaultValue: Readonly<IPushNotifications> = {};

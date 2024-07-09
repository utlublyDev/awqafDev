import dayjs from "dayjs";

export interface IComplaint {
  id?: number;
  userId?: number | null;
  userName?: string | null;
  subject?: string | null;
  complaintTextBody?: string | null;
  date?: string | null;
  about?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IComplaint> = {};

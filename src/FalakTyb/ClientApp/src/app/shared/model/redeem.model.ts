import dayjs from "dayjs";

export interface IRedeem {
  id?: number;
  userId?: number;
  providerId?: number;
  offerId?: number | null;
  code?: string | null;
  date?: string | null;
  countCode?: number | null;
}

export const defaultValue: Readonly<IRedeem> = {};

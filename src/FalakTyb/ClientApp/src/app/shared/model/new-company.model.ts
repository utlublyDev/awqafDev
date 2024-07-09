import dayjs from "dayjs";

export interface INewCompany {
  id?: number;
  name?: string;
  companyName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  companyType?: string;
  commercialRegistrationNo?: string;
  tradeLicenseNumber?: string;
  serviceType?: string | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<INewCompany> = {};

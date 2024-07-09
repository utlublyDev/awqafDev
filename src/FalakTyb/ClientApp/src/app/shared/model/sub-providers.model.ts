import dayjs from "dayjs";

export interface ISubProviders {
  id?: number;
  providerNameInEnglish?: string;
  providerNameInArabic?: string;
  latitude?: string;
  longitude?: string;
  phoneNumber?: string;
  email?: string | null;
  providerImageUrl?: string | null;
  address?: string;
  isActive?: boolean;
  isWeChooseForYou?: boolean | null;
  isVip?: boolean | null;
  note?: string | null;
  addedBy?: string | null;
  itWillHaveHoldingCompanies?: boolean | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<ISubProviders> = {
  isActive: false,
  isWeChooseForYou: false,
  isVip: false,
  itWillHaveHoldingCompanies: false,
};

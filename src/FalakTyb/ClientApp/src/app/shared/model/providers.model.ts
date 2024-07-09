import dayjs from "dayjs";
import { IProvidersCategories } from "app/shared/model/providers-categories.model";

export interface IProviders {
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
  itWillHaveSubProviders?: boolean | null;
  addedBy?: string | null;
  creationDate?: string | null;
  mainServiceProviderId?: number | null;
  keyWordsInEnglish?: string | null;
  keyWordsInArabic?: string | null;
  addressInArabic?: string | null;
  providerCode?: string | null;
  maximumUsageCode?: number | null;
  websiteUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  providersCategories?: IProvidersCategories | null;
}

export const defaultValue: Readonly<IProviders> = {
  isActive: false,
  isWeChooseForYou: false,
  isVip: false,
  itWillHaveSubProviders: false,
};

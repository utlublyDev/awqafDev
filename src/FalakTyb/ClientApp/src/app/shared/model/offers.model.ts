import dayjs from "dayjs";
import { IOffersCategories } from "app/shared/model/offers-categories.model";

export interface IOffers {
  id?: number;
  providerId?: string;
  subProviderId?: string | null;
  offerNameInEnglish?: string | null;
  offerNameInArabic?: string | null;
  offerAmountPercentage?: number;
  offerStartDate?: string | null;
  offerEndDate?: string | null;
  offerIsValidate?: boolean | null;
  offerPrice?: number | null;
  offerCode?: string | null;
  location?: string | null;
  offerDetailsInEnglish?: string | null;
  offerDetailsInArabic?: string | null;
  addedBy?: string | null;
  creationDate?: string | null;
  websiteUrl?: string | null;
  locationInArabic?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  isWebsiteOrApp?: boolean | null;
  offerImageUrl?: string | null;
  offersCategories?: IOffersCategories | null;
}

export const defaultValue: Readonly<IOffers> = {
  offerIsValidate: false,
  isWebsiteOrApp: false,
};

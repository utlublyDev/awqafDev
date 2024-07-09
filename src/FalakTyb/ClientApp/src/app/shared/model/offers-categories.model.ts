import dayjs from "dayjs";

export interface IOffersCategories {
  id?: number;
  offerCategorieNameInEnglish?: string;
  offerCategorieNameInArabic?: string;
  offerCategorieIconUrl?: string | null;
  addedBy?: string | null;
  status?: boolean | null;
  creationDate?: string | null;
  offerProviderId?: number | null;
}

export const defaultValue: Readonly<IOffersCategories> = {
  status: false,
};

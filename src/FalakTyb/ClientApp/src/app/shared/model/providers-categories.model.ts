import dayjs from "dayjs";

export interface IProvidersCategories {
  id?: number;
  providersCategorieNameInEnglish?: string;
  providersCategorieNameInArabic?: string;
  providersCategorieIconUrl?: string | null;
  itWillHaveHoldingCompaniesb?: boolean | null;
  addedBy?: string | null;
  status?: boolean | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<IProvidersCategories> = {
  itWillHaveHoldingCompaniesb: false,
  status: false,
};

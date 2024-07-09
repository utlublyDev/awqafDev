import dayjs from "dayjs";
import { IProviders } from "app/shared/model/providers.model";

export interface IContract {
  id?: number;
  contractDescription?: string | null;
  contactNumber?: string | null;
  email?: string | null;
  status?: boolean | null;
  contractStartDate?: string;
  contractEndDate?: string;
  creationDate?: string | null;
  providers?: IProviders | null;
}

export const defaultValue: Readonly<IContract> = {
  status: false,
};

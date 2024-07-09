export interface ISavedProviders {
  id?: number;
  userIdAwqaf?: string;
  providerId?: string | null;
  subProviderId?: string | null;
  offerId?: string | null;
  isOffer?: boolean | null;
}

export const defaultValue: Readonly<ISavedProviders> = {
  isOffer: false,
};

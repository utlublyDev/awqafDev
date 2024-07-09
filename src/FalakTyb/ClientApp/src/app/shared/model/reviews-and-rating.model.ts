export interface IReviewsAndRating {
  id?: number;
  userIdAwqaf?: string | null;
  providerId?: string | null;
  offerId?: string | null;
  review?: string | null;
  rating?: number | null;
}

export const defaultValue: Readonly<IReviewsAndRating> = {};

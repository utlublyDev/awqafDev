import providers from "app/entities/providers/providers.reducer";
import subProviders from "app/entities/sub-providers/sub-providers.reducer";
import providersCategories from "app/entities/providers-categories/providers-categories.reducer";
import savedProviders from "app/entities/saved-providers/saved-providers.reducer";
import offers from "app/entities/offers/offers.reducer";
import offersCategories from "app/entities/offers-categories/offers-categories.reducer";
import contract from "app/entities/contract/contract.reducer";
import frequentlyAskedQuestions from "app/entities/frequently-asked-questions/frequently-asked-questions.reducer";
import reviewsAndRating from "app/entities/reviews-and-rating/reviews-and-rating.reducer";
import notification from "app/entities/notification/notification.reducer";
import pushNotifications from "app/entities/push-notifications/push-notifications.reducer";

import redeem from "app/entities/redeem/redeem.reducer";

import complaint from "app/entities/complaint/complaint.reducer";

import newCompany from "app/entities/new-company/new-company.reducer";

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  providers,
  subProviders,
  providersCategories,
  savedProviders,
  offers,
  offersCategories,
  contract,
  frequentlyAskedQuestions,
  reviewsAndRating,
  notification,
  pushNotifications,
  redeem,
  complaint,
  newCompany,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;

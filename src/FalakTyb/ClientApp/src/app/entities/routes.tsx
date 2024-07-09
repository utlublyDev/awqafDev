import React from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Providers from "./providers";
import SubProviders from "./sub-providers";
import ProvidersCategories from "./providers-categories";
import SavedProviders from "./saved-providers";
import Offers from "./offers";
import OffersCategories from "./offers-categories";
import Contract from "./contract";
import FrequentlyAskedQuestions from "./frequently-asked-questions";
import ReviewsAndRating from "./reviews-and-rating";
import Notification from "./notification";
import PushNotifications from "./push-notifications";

import Redeem from "./redeem";

import Complaint from "./complaint";

import NewCompany from "./new-company";

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}providers`} component={Providers} />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute path={`${match.url}offers`} component={Offers} />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute path={`${match.url}redeem`} component={Redeem} />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute
          path={`${match.url}complaint`}
          component={Complaint}
        />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute
          path={`${match.url}new-company`}
          component={NewCompany}
        />
        <ErrorBoundaryRoute
          path={`${match.url}sub-providers`}
          component={SubProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}providers-categories`}
          component={ProvidersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}saved-providers`}
          component={SavedProviders}
        />
        <ErrorBoundaryRoute
          path={`${match.url}offers-categories`}
          component={OffersCategories}
        />
        <ErrorBoundaryRoute
          path={`${match.url}contract`}
          component={Contract}
        />
        <ErrorBoundaryRoute
          path={`${match.url}frequently-asked-questions`}
          component={FrequentlyAskedQuestions}
        />
        <ErrorBoundaryRoute
          path={`${match.url}reviews-and-rating`}
          component={ReviewsAndRating}
        />
        <ErrorBoundaryRoute
          path={`${match.url}notification`}
          component={Notification}
        />
        <ErrorBoundaryRoute
          path={`${match.url}push-notifications`}
          component={PushNotifications}
        />
        <ErrorBoundaryRoute
          path={`${match.url}complaint`}
          component={Complaint}
        />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};

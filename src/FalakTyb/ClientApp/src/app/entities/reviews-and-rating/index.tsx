import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import ReviewsAndRating from "./reviews-and-rating";
import ReviewsAndRatingDetail from "./reviews-and-rating-detail";
import ReviewsAndRatingUpdate from "./reviews-and-rating-update";
import ReviewsAndRatingDeleteDialog from "./reviews-and-rating-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={ReviewsAndRatingUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={ReviewsAndRatingUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={ReviewsAndRatingDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={ReviewsAndRating} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={ReviewsAndRatingDeleteDialog}
    />
  </>
);

export default Routes;

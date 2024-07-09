import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import OffersCategories from "./offers-categories";
import OffersCategoriesDetail from "./offers-categories-detail";
import OffersCategoriesUpdate from "./offers-categories-update";
import OffersCategoriesDeleteDialog from "./offers-categories-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={OffersCategoriesUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={OffersCategoriesUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={OffersCategoriesDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={OffersCategories} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={OffersCategoriesDeleteDialog}
    />
  </>
);

export default Routes;

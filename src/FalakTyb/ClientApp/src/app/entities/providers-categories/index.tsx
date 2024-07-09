import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import ProvidersCategories from "./providers-categories";
import ProvidersCategoriesDetail from "./providers-categories-detail";
import ProvidersCategoriesUpdate from "./providers-categories-update";
import ProvidersCategoriesDeleteDialog from "./providers-categories-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={ProvidersCategoriesUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={ProvidersCategoriesUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={ProvidersCategoriesDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={ProvidersCategories} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={ProvidersCategoriesDeleteDialog}
    />
  </>
);

export default Routes;

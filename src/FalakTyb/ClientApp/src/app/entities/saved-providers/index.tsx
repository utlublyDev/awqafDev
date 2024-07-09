import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import SavedProviders from "./saved-providers";
import SavedProvidersDetail from "./saved-providers-detail";
import SavedProvidersUpdate from "./saved-providers-update";
import SavedProvidersDeleteDialog from "./saved-providers-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={SavedProvidersUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={SavedProvidersUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={SavedProvidersDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={SavedProviders} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={SavedProvidersDeleteDialog}
    />
  </>
);

export default Routes;

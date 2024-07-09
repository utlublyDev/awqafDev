import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import SubProviders from "./sub-providers";
import SubProvidersDetail from "./sub-providers-detail";
import SubProvidersUpdate from "./sub-providers-update";
import SubProvidersDeleteDialog from "./sub-providers-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={SubProvidersUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={SubProvidersUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={SubProvidersDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={SubProviders} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={SubProvidersDeleteDialog}
    />
  </>
);

export default Routes;

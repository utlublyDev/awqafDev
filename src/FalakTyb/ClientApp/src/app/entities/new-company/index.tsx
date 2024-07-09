import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import NewCompany from "./new-company";
import NewCompanyDetail from "./new-company-detail";
import NewCompanyUpdate from "./new-company-update";
import NewCompanyDeleteDialog from "./new-company-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={NewCompanyUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={NewCompanyUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={NewCompanyDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={NewCompany} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={NewCompanyDeleteDialog}
    />
  </>
);

export default Routes;

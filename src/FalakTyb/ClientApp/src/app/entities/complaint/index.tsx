import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Complaint from "./complaint";
import ComplaintDetail from "./complaint-detail";
import ComplaintUpdate from "./complaint-update";
import ComplaintDeleteDialog from "./complaint-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={ComplaintUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={ComplaintUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={ComplaintDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Complaint} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={ComplaintDeleteDialog}
    />
  </>
);

export default Routes;

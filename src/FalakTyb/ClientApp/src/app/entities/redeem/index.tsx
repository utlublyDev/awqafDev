import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import Redeem from "./redeem";
import RedeemDetail from "./redeem-detail";
import RedeemUpdate from "./redeem-update";
import RedeemDeleteDialog from "./redeem-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={RedeemUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={RedeemUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={RedeemDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={Redeem} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={RedeemDeleteDialog}
    />
  </>
);

export default Routes;

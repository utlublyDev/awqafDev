import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import PushNotifications from "./push-notifications";
import PushNotificationsDetail from "./push-notifications-detail";
import PushNotificationsUpdate from "./push-notifications-update";
import PushNotificationsDeleteDialog from "./push-notifications-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={PushNotificationsUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={PushNotificationsUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={PushNotificationsDetail}
      />
      <ErrorBoundaryRoute path={match.url} component={PushNotifications} />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={PushNotificationsDeleteDialog}
    />
  </>
);

export default Routes;

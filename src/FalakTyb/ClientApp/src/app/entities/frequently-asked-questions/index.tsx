import React from "react";
import { Switch } from "react-router-dom";

import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import FrequentlyAskedQuestions from "./frequently-asked-questions";
import FrequentlyAskedQuestionsDetail from "./frequently-asked-questions-detail";
import FrequentlyAskedQuestionsUpdate from "./frequently-asked-questions-update";
import FrequentlyAskedQuestionsDeleteDialog from "./frequently-asked-questions-delete-dialog";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/new`}
        component={FrequentlyAskedQuestionsUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id/edit`}
        component={FrequentlyAskedQuestionsUpdate}
      />
      <ErrorBoundaryRoute
        exact
        path={`${match.url}/:id`}
        component={FrequentlyAskedQuestionsDetail}
      />
      <ErrorBoundaryRoute
        path={match.url}
        component={FrequentlyAskedQuestions}
      />
    </Switch>
    <ErrorBoundaryRoute
      exact
      path={`${match.url}/:id/delete`}
      component={FrequentlyAskedQuestionsDeleteDialog}
    />
  </>
);

export default Routes;

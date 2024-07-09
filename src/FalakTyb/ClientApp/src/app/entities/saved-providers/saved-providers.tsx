import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { ISavedProviders } from "app/shared/model/saved-providers.model";
import { getEntities } from "./saved-providers.reducer";

export const SavedProviders = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const savedProvidersList = useAppSelector(
    (state) => state.savedProviders.entities
  );
  const loading = useAppSelector((state) => state.savedProviders.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="saved-providers-heading" data-cy="SavedProvidersHeading">
        <Translate contentKey="falakTybApp.savedProviders.home.title">
          Saved Providers
        </Translate>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} />{" "}
            <Translate contentKey="falakTybApp.savedProviders.home.refreshListLabel">
              Refresh List
            </Translate>
          </Button>
          <Link
            to="/saved-providers/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="falakTybApp.savedProviders.home.createLabel">
              Create new Saved Providers
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {savedProvidersList && savedProvidersList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.id">
                    ID
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.userIdAwqaf">
                    User Id Awqaf
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.providerId">
                    Provider Id
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.subProviderId">
                    Sub Provider Id
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.offerId">
                    Offer Id
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.savedProviders.isOffer">
                    Is Offer
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {savedProvidersList.map((savedProviders, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/saved-providers/${savedProviders.id}`}
                      color="link"
                      size="sm"
                    >
                      {savedProviders.id}
                    </Button>
                  </td>
                  <td>{savedProviders.userIdAwqaf}</td>
                  <td>{savedProviders.providerId}</td>
                  <td>{savedProviders.subProviderId}</td>
                  <td>{savedProviders.offerId}</td>
                  <td>{savedProviders.isOffer ? "true" : "false"}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/saved-providers/${savedProviders.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{" "}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">
                            View
                          </Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/saved-providers/${savedProviders.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{" "}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">
                            Edit
                          </Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/saved-providers/${savedProviders.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{" "}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">
                            Delete
                          </Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="falakTybApp.savedProviders.home.notFound">
                No Saved Providers found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SavedProviders;

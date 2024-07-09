import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { ISubProviders } from "app/shared/model/sub-providers.model";
import { getEntities } from "./sub-providers.reducer";

export const SubProviders = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const subProvidersList = useAppSelector(
    (state) => state.subProviders.entities
  );
  const loading = useAppSelector((state) => state.subProviders.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="sub-providers-heading" data-cy="SubProvidersHeading">
        <Translate contentKey="falakTybApp.subProviders.home.title">
          Sub Providers
        </Translate>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} />{" "}
            <Translate contentKey="falakTybApp.subProviders.home.refreshListLabel">
              Refresh List
            </Translate>
          </Button>
          <Link
            to="/sub-providers/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="falakTybApp.subProviders.home.createLabel">
              Create new Sub Providers
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subProvidersList && subProvidersList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.id">
                    ID
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.providerNameInEnglish">
                    Provider Name In English
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.providerNameInArabic">
                    Provider Name In Arabic
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.latitude">
                    Latitude
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.longitude">
                    Longitude
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.phoneNumber">
                    Phone Number
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.email">
                    Email
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.providerImageUrl">
                    Provider Image Url
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.address">
                    Address
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.isActive">
                    Is Active
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.isWeChooseForYou">
                    Is We Choose For You
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.isVip">
                    Is Vip
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.note">
                    Note
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.addedBy">
                    Added By
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.itWillHaveHoldingCompanies">
                    It Will Have Holding Companies
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.subProviders.creationDate">
                    Creation Date
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subProvidersList.map((subProviders, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/sub-providers/${subProviders.id}`}
                      color="link"
                      size="sm"
                    >
                      {subProviders.id}
                    </Button>
                  </td>
                  <td>{subProviders.providerNameInEnglish}</td>
                  <td>{subProviders.providerNameInArabic}</td>
                  <td>{subProviders.latitude}</td>
                  <td>{subProviders.longitude}</td>
                  <td>{subProviders.phoneNumber}</td>
                  <td>{subProviders.email}</td>
                  <td>{subProviders.providerImageUrl}</td>
                  <td>{subProviders.address}</td>
                  <td>{subProviders.isActive ? "true" : "false"}</td>
                  <td>{subProviders.isWeChooseForYou ? "true" : "false"}</td>
                  <td>{subProviders.isVip ? "true" : "false"}</td>
                  <td>{subProviders.note}</td>
                  <td>{subProviders.addedBy}</td>
                  <td>
                    {subProviders.itWillHaveHoldingCompanies ? "true" : "false"}
                  </td>
                  <td>
                    {subProviders.creationDate ? (
                      <TextFormat
                        type="date"
                        value={subProviders.creationDate}
                        format={APP_LOCAL_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/sub-providers/${subProviders.id}`}
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
                        to={`/sub-providers/${subProviders.id}/edit`}
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
                        to={`/sub-providers/${subProviders.id}/delete`}
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
              <Translate contentKey="falakTybApp.subProviders.home.notFound">
                No Sub Providers found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SubProviders;

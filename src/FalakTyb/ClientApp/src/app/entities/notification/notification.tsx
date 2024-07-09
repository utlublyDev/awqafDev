import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { INotification } from "app/shared/model/notification.model";
import { getEntities } from "./notification.reducer";

export const Notification = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const notificationList = useAppSelector(
    (state) => state.notification.entities
  );
  const loading = useAppSelector((state) => state.notification.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="notification-heading" data-cy="NotificationHeading">
        <Translate contentKey="falakTybApp.notification.home.title">
          Notifications
        </Translate>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} />{" "}
            <Translate contentKey="falakTybApp.notification.home.refreshListLabel">
              Refresh List
            </Translate>
          </Button>
          <Link
            to="/notification/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="falakTybApp.notification.home.createLabel">
              Create new Notification
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {notificationList && notificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="falakTybApp.notification.id">
                    ID
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.notification.details">
                    Details
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.notification.userIdAwqaf">
                    User Id Awqaf
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.notification.contractId">
                    Contract Id
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.notification.sentDate">
                    Sent Date
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="falakTybApp.notification.date">
                    Date
                  </Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notificationList.map((notification, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button
                      tag={Link}
                      to={`/notification/${notification.id}`}
                      color="link"
                      size="sm"
                    >
                      {notification.id}
                    </Button>
                  </td>
                  <td>{notification.details}</td>
                  <td>{notification.userIdAwqaf}</td>
                  <td>{notification.contractId}</td>
                  <td>
                    {notification.sentDate ? (
                      <TextFormat
                        type="date"
                        value={notification.sentDate}
                        format={APP_LOCAL_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td>
                    {notification.date ? (
                      <TextFormat
                        type="date"
                        value={notification.date}
                        format={APP_LOCAL_DATE_FORMAT}
                      />
                    ) : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/notification/${notification.id}`}
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
                        to={`/notification/${notification.id}/edit`}
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
                        to={`/notification/${notification.id}/delete`}
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
              <Translate contentKey="falakTybApp.notification.home.notFound">
                No Notifications found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Notification;

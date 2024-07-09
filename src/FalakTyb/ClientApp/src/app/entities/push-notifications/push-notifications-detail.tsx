import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./push-notifications.reducer";

export const PushNotificationsDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const pushNotificationsEntity = useAppSelector(
    (state) => state.pushNotifications.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pushNotificationsDetailsHeading">
          <Translate contentKey="falakTybApp.pushNotifications.detail.title">
            PushNotifications
          </Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pushNotificationsEntity.id}</dd>
          <dt>
            <span id="header">
              <Translate contentKey="falakTybApp.pushNotifications.header">
                Header
              </Translate>
            </span>
          </dt>
          <dd>{pushNotificationsEntity.header}</dd>
          <dt>
            <span id="details">
              <Translate contentKey="falakTybApp.pushNotifications.details">
                Details
              </Translate>
            </span>
          </dt>
          <dd>{pushNotificationsEntity.details}</dd>
          <dt>
            <span id="sentBy">
              <Translate contentKey="falakTybApp.pushNotifications.sentBy">
                Sent By
              </Translate>
            </span>
          </dt>
          <dd>{pushNotificationsEntity.sentBy}</dd>
          <dt>
            <span id="sentDate">
              <Translate contentKey="falakTybApp.pushNotifications.sentDate">
                Sent Date
              </Translate>
            </span>
          </dt>
          <dd>
            {pushNotificationsEntity.sentDate ? (
              <TextFormat
                value={pushNotificationsEntity.sentDate}
                type="date"
                format={APP_LOCAL_DATE_FORMAT}
              />
            ) : null}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/push-notifications"
          replace
          color="info"
          data-cy="entityDetailsBackButton"
        >
          <FontAwesomeIcon icon="arrow-left" />{" "}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button
          tag={Link}
          to={`/push-notifications/${pushNotificationsEntity.id}/edit`}
          replace
          color="primary"
        >
          <FontAwesomeIcon icon="pencil-alt" />{" "}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PushNotificationsDetail;

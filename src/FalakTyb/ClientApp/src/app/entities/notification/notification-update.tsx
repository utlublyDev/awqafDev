import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, FormText } from "reactstrap";
import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { INotification } from "app/shared/model/notification.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./notification.reducer";

export const NotificationUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const notificationEntity = useAppSelector(
    (state) => state.notification.entity
  );
  const loading = useAppSelector((state) => state.notification.loading);
  const updating = useAppSelector((state) => state.notification.updating);
  const updateSuccess = useAppSelector(
    (state) => state.notification.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/notification");
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (values) => {
    const entity = {
      ...notificationEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...notificationEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.notification.home.createOrEditLabel"
            data-cy="NotificationCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.notification.home.createOrEditLabel">
              Create or edit a Notification
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="notification-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate("falakTybApp.notification.details")}
                id="notification-details"
                name="details"
                data-cy="details"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.notification.userIdAwqaf")}
                id="notification-userIdAwqaf"
                name="userIdAwqaf"
                data-cy="userIdAwqaf"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.notification.contractId")}
                id="notification-contractId"
                name="contractId"
                data-cy="contractId"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.notification.sentDate")}
                id="notification-sentDate"
                name="sentDate"
                data-cy="sentDate"
                type="date"
              />
              <ValidatedField
                label={translate("falakTybApp.notification.date")}
                id="notification-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/notification"
                replace
                color="info"
              >
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NotificationUpdate;

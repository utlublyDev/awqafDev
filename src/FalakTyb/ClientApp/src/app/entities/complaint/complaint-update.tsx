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

import { IComplaint } from "app/shared/model/complaint.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./complaint.reducer";

export const ComplaintUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const complaintEntity = useAppSelector((state) => state.complaint.entity);
  const loading = useAppSelector((state) => state.complaint.loading);
  const updating = useAppSelector((state) => state.complaint.updating);
  const updateSuccess = useAppSelector(
    (state) => state.complaint.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/complaint");
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
      ...complaintEntity,
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
          ...complaintEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.complaint.home.createOrEditLabel"
            data-cy="ComplaintCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.complaint.home.createOrEditLabel">
              Create or edit a Complaint
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
                  id="complaint-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate("falakTybApp.complaint.userId")}
                id="complaint-userId"
                name="userId"
                data-cy="userId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.userName")}
                id="complaint-userName"
                name="userName"
                data-cy="userName"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.subject")}
                id="complaint-subject"
                name="subject"
                data-cy="subject"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.complaintTextBody")}
                id="complaint-complaintTextBody"
                name="complaintTextBody"
                data-cy="complaintTextBody"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.date")}
                id="complaint-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.about")}
                id="complaint-about"
                name="about"
                data-cy="about"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.phoneNumber")}
                id="complaint-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.complaint.email")}
                id="complaint-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/complaint"
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

export default ComplaintUpdate;

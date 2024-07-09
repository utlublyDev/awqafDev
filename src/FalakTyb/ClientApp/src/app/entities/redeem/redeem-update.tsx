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

import { IRedeem } from "app/shared/model/redeem.model";
import { getEntity, updateEntity, createEntity, reset } from "./redeem.reducer";

export const RedeemUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const redeemEntity = useAppSelector((state) => state.redeem.entity);
  const loading = useAppSelector((state) => state.redeem.loading);
  const updating = useAppSelector((state) => state.redeem.updating);
  const updateSuccess = useAppSelector((state) => state.redeem.updateSuccess);
  const handleClose = () => {
    props.history.push("/redeem");
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
      ...redeemEntity,
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
          ...redeemEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.redeem.home.createOrEditLabel"
            data-cy="RedeemCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.redeem.home.createOrEditLabel">
              Create or edit a Redeem
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
                  id="redeem-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate("falakTybApp.redeem.userId")}
                id="redeem-userId"
                name="userId"
                data-cy="userId"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                  validate: (v) =>
                    isNumber(v) || translate("entity.validation.number"),
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.redeem.providerId")}
                id="redeem-providerId"
                name="providerId"
                data-cy="providerId"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                  validate: (v) =>
                    isNumber(v) || translate("entity.validation.number"),
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.redeem.offerId")}
                id="redeem-offerId"
                name="offerId"
                data-cy="offerId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.redeem.code")}
                id="redeem-code"
                name="code"
                data-cy="code"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.redeem.date")}
                id="redeem-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                label={translate("falakTybApp.redeem.countCode")}
                id="redeem-countCode"
                name="countCode"
                data-cy="countCode"
                type="text"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/redeem"
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

export default RedeemUpdate;

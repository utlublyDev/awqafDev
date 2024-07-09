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

import { ISavedProviders } from "app/shared/model/saved-providers.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./saved-providers.reducer";

export const SavedProvidersUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const savedProvidersEntity = useAppSelector(
    (state) => state.savedProviders.entity
  );
  const loading = useAppSelector((state) => state.savedProviders.loading);
  const updating = useAppSelector((state) => state.savedProviders.updating);
  const updateSuccess = useAppSelector(
    (state) => state.savedProviders.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/saved-providers");
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
      ...savedProvidersEntity,
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
          ...savedProvidersEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.savedProviders.home.createOrEditLabel"
            data-cy="SavedProvidersCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.savedProviders.home.createOrEditLabel">
              Create or edit a SavedProviders
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
                  id="saved-providers-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate("falakTybApp.savedProviders.userIdAwqaf")}
                id="saved-providers-userIdAwqaf"
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
                label={translate("falakTybApp.savedProviders.providerId")}
                id="saved-providers-providerId"
                name="providerId"
                data-cy="providerId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.savedProviders.subProviderId")}
                id="saved-providers-subProviderId"
                name="subProviderId"
                data-cy="subProviderId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.savedProviders.offerId")}
                id="saved-providers-offerId"
                name="offerId"
                data-cy="offerId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.savedProviders.isOffer")}
                id="saved-providers-isOffer"
                name="isOffer"
                data-cy="isOffer"
                check
                type="checkbox"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/saved-providers"
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

export default SavedProvidersUpdate;

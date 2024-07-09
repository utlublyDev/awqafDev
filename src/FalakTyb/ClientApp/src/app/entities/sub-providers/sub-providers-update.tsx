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

import { ISubProviders } from "app/shared/model/sub-providers.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./sub-providers.reducer";

export const SubProvidersUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const subProvidersEntity = useAppSelector(
    (state) => state.subProviders.entity
  );
  const loading = useAppSelector((state) => state.subProviders.loading);
  const updating = useAppSelector((state) => state.subProviders.updating);
  const updateSuccess = useAppSelector(
    (state) => state.subProviders.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/sub-providers");
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
      ...subProvidersEntity,
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
          ...subProvidersEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.subProviders.home.createOrEditLabel"
            data-cy="SubProvidersCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.subProviders.home.createOrEditLabel">
              Create or edit a SubProviders
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
                  id="sub-providers-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate(
                  "falakTybApp.subProviders.providerNameInEnglish"
                )}
                id="sub-providers-providerNameInEnglish"
                name="providerNameInEnglish"
                data-cy="providerNameInEnglish"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate(
                  "falakTybApp.subProviders.providerNameInArabic"
                )}
                id="sub-providers-providerNameInArabic"
                name="providerNameInArabic"
                data-cy="providerNameInArabic"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.latitude")}
                id="sub-providers-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.longitude")}
                id="sub-providers-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.phoneNumber")}
                id="sub-providers-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.email")}
                id="sub-providers-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.providerImageUrl")}
                id="sub-providers-providerImageUrl"
                name="providerImageUrl"
                data-cy="providerImageUrl"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.address")}
                id="sub-providers-address"
                name="address"
                data-cy="address"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate("entity.validation.required"),
                  },
                }}
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.isActive")}
                id="sub-providers-isActive"
                name="isActive"
                data-cy="isActive"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.isWeChooseForYou")}
                id="sub-providers-isWeChooseForYou"
                name="isWeChooseForYou"
                data-cy="isWeChooseForYou"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.isVip")}
                id="sub-providers-isVip"
                name="isVip"
                data-cy="isVip"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.note")}
                id="sub-providers-note"
                name="note"
                data-cy="note"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.addedBy")}
                id="sub-providers-addedBy"
                name="addedBy"
                data-cy="addedBy"
                type="text"
              />
              <ValidatedField
                label={translate(
                  "falakTybApp.subProviders.itWillHaveHoldingCompanies"
                )}
                id="sub-providers-itWillHaveHoldingCompanies"
                name="itWillHaveHoldingCompanies"
                data-cy="itWillHaveHoldingCompanies"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate("falakTybApp.subProviders.creationDate")}
                id="sub-providers-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="date"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/sub-providers"
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

export default SubProvidersUpdate;

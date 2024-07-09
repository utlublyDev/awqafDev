import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./saved-providers.reducer";

export const SavedProvidersDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const savedProvidersEntity = useAppSelector(
    (state) => state.savedProviders.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="savedProvidersDetailsHeading">
          <Translate contentKey="falakTybApp.savedProviders.detail.title">
            SavedProviders
          </Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.id}</dd>
          <dt>
            <span id="userIdAwqaf">
              <Translate contentKey="falakTybApp.savedProviders.userIdAwqaf">
                User Id Awqaf
              </Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.userIdAwqaf}</dd>
          <dt>
            <span id="providerId">
              <Translate contentKey="falakTybApp.savedProviders.providerId">
                Provider Id
              </Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.providerId}</dd>
          <dt>
            <span id="subProviderId">
              <Translate contentKey="falakTybApp.savedProviders.subProviderId">
                Sub Provider Id
              </Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.subProviderId}</dd>
          <dt>
            <span id="offerId">
              <Translate contentKey="falakTybApp.savedProviders.offerId">
                Offer Id
              </Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.offerId}</dd>
          <dt>
            <span id="isOffer">
              <Translate contentKey="falakTybApp.savedProviders.isOffer">
                Is Offer
              </Translate>
            </span>
          </dt>
          <dd>{savedProvidersEntity.isOffer ? "true" : "false"}</dd>
        </dl>
        <Button
          tag={Link}
          to="/saved-providers"
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
          to={`/saved-providers/${savedProvidersEntity.id}/edit`}
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

export default SavedProvidersDetail;

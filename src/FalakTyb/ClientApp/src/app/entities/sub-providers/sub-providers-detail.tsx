import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./sub-providers.reducer";

export const SubProvidersDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const subProvidersEntity = useAppSelector(
    (state) => state.subProviders.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subProvidersDetailsHeading">
          <Translate contentKey="falakTybApp.subProviders.detail.title">
            SubProviders
          </Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.id}</dd>
          <dt>
            <span id="providerNameInEnglish">
              <Translate contentKey="falakTybApp.subProviders.providerNameInEnglish">
                Provider Name In English
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.providerNameInEnglish}</dd>
          <dt>
            <span id="providerNameInArabic">
              <Translate contentKey="falakTybApp.subProviders.providerNameInArabic">
                Provider Name In Arabic
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.providerNameInArabic}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="falakTybApp.subProviders.latitude">
                Latitude
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="falakTybApp.subProviders.longitude">
                Longitude
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.longitude}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="falakTybApp.subProviders.phoneNumber">
                Phone Number
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.phoneNumber}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="falakTybApp.subProviders.email">
                Email
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.email}</dd>
          <dt>
            <span id="providerImageUrl">
              <Translate contentKey="falakTybApp.subProviders.providerImageUrl">
                Provider Image Url
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.providerImageUrl}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="falakTybApp.subProviders.address">
                Address
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.address}</dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="falakTybApp.subProviders.isActive">
                Is Active
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.isActive ? "true" : "false"}</dd>
          <dt>
            <span id="isWeChooseForYou">
              <Translate contentKey="falakTybApp.subProviders.isWeChooseForYou">
                Is We Choose For You
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.isWeChooseForYou ? "true" : "false"}</dd>
          <dt>
            <span id="isVip">
              <Translate contentKey="falakTybApp.subProviders.isVip">
                Is Vip
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.isVip ? "true" : "false"}</dd>
          <dt>
            <span id="note">
              <Translate contentKey="falakTybApp.subProviders.note">
                Note
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.note}</dd>
          <dt>
            <span id="addedBy">
              <Translate contentKey="falakTybApp.subProviders.addedBy">
                Added By
              </Translate>
            </span>
          </dt>
          <dd>{subProvidersEntity.addedBy}</dd>
          <dt>
            <span id="itWillHaveHoldingCompanies">
              <Translate contentKey="falakTybApp.subProviders.itWillHaveHoldingCompanies">
                It Will Have Holding Companies
              </Translate>
            </span>
          </dt>
          <dd>
            {subProvidersEntity.itWillHaveHoldingCompanies ? "true" : "false"}
          </dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="falakTybApp.subProviders.creationDate">
                Creation Date
              </Translate>
            </span>
          </dt>
          <dd>
            {subProvidersEntity.creationDate ? (
              <TextFormat
                value={subProvidersEntity.creationDate}
                type="date"
                format={APP_LOCAL_DATE_FORMAT}
              />
            ) : null}
          </dd>
        </dl>
        <Button
          tag={Link}
          to="/sub-providers"
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
          to={`/sub-providers/${subProvidersEntity.id}/edit`}
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

export default SubProvidersDetail;

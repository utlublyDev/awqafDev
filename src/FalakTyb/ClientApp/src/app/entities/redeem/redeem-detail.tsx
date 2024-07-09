import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate, TextFormat } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./redeem.reducer";

export const RedeemDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const redeemEntity = useAppSelector((state) => state.redeem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="redeemDetailsHeading">
          <Translate contentKey="falakTybApp.redeem.detail.title">
            Redeem
          </Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{redeemEntity.id}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="falakTybApp.redeem.userId">
                User Id
              </Translate>
            </span>
          </dt>
          <dd>{redeemEntity.userId}</dd>
          <dt>
            <span id="providerId">
              <Translate contentKey="falakTybApp.redeem.providerId">
                Provider Id
              </Translate>
            </span>
          </dt>
          <dd>{redeemEntity.providerId}</dd>
          <dt>
            <span id="offerId">
              <Translate contentKey="falakTybApp.redeem.offerId">
                Offer Id
              </Translate>
            </span>
          </dt>
          <dd>{redeemEntity.offerId}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="falakTybApp.redeem.code">Code</Translate>
            </span>
          </dt>
          <dd>{redeemEntity.code}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="falakTybApp.redeem.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {redeemEntity.date ? (
              <TextFormat
                value={redeemEntity.date}
                type="date"
                format={APP_LOCAL_DATE_FORMAT}
              />
            ) : null}
          </dd>
          <dt>
            <span id="countCode">
              <Translate contentKey="falakTybApp.redeem.countCode">
                Count Code
              </Translate>
            </span>
          </dt>
          <dd>{redeemEntity.countCode}</dd>
        </dl>
        <Button
          tag={Link}
          to="/redeem"
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
          to={`/redeem/${redeemEntity.id}/edit`}
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

export default RedeemDetail;

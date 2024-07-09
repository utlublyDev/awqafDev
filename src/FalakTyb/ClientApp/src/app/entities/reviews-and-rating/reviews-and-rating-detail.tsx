import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from "app/config/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntity } from "./reviews-and-rating.reducer";

export const ReviewsAndRatingDetail = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const reviewsAndRatingEntity = useAppSelector(
    (state) => state.reviewsAndRating.entity
  );
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reviewsAndRatingDetailsHeading">
          <Translate contentKey="falakTybApp.reviewsAndRating.detail.title">
            ReviewsAndRating
          </Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.id}</dd>
          <dt>
            <span id="userIdAwqaf">
              <Translate contentKey="falakTybApp.reviewsAndRating.userIdAwqaf">
                User Id Awqaf
              </Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.userIdAwqaf}</dd>
          <dt>
            <span id="providerId">
              <Translate contentKey="falakTybApp.reviewsAndRating.providerId">
                Provider Id
              </Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.providerId}</dd>
          <dt>
            <span id="offerId">
              <Translate contentKey="falakTybApp.reviewsAndRating.offerId">
                Offer Id
              </Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.offerId}</dd>
          <dt>
            <span id="review">
              <Translate contentKey="falakTybApp.reviewsAndRating.review">
                Review
              </Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.review}</dd>
          <dt>
            <span id="rating">
              <Translate contentKey="falakTybApp.reviewsAndRating.rating">
                Rating
              </Translate>
            </span>
          </dt>
          <dd>{reviewsAndRatingEntity.rating}</dd>
        </dl>
        <Button
          tag={Link}
          to="/reviews-and-rating"
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
          to={`/reviews-and-rating/${reviewsAndRatingEntity.id}/edit`}
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

export default ReviewsAndRatingDetail;

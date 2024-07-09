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

import { IReviewsAndRating } from "app/shared/model/reviews-and-rating.model";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "./reviews-and-rating.reducer";

export const ReviewsAndRatingUpdate = (
  props: RouteComponentProps<{ id: string }>
) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const reviewsAndRatingEntity = useAppSelector(
    (state) => state.reviewsAndRating.entity
  );
  const loading = useAppSelector((state) => state.reviewsAndRating.loading);
  const updating = useAppSelector((state) => state.reviewsAndRating.updating);
  const updateSuccess = useAppSelector(
    (state) => state.reviewsAndRating.updateSuccess
  );
  const handleClose = () => {
    props.history.push("/reviews-and-rating");
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
      ...reviewsAndRatingEntity,
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
          ...reviewsAndRatingEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="falakTybApp.reviewsAndRating.home.createOrEditLabel"
            data-cy="ReviewsAndRatingCreateUpdateHeading"
          >
            <Translate contentKey="falakTybApp.reviewsAndRating.home.createOrEditLabel">
              Create or edit a ReviewsAndRating
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
                  id="reviews-and-rating-id"
                  label={translate("global.field.id")}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate("falakTybApp.reviewsAndRating.userIdAwqaf")}
                id="reviews-and-rating-userIdAwqaf"
                name="userIdAwqaf"
                data-cy="userIdAwqaf"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.reviewsAndRating.providerId")}
                id="reviews-and-rating-providerId"
                name="providerId"
                data-cy="providerId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.reviewsAndRating.offerId")}
                id="reviews-and-rating-offerId"
                name="offerId"
                data-cy="offerId"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.reviewsAndRating.review")}
                id="reviews-and-rating-review"
                name="review"
                data-cy="review"
                type="text"
              />
              <ValidatedField
                label={translate("falakTybApp.reviewsAndRating.rating")}
                id="reviews-and-rating-rating"
                name="rating"
                data-cy="rating"
                type="text"
              />
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/reviews-and-rating"
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

export default ReviewsAndRatingUpdate;

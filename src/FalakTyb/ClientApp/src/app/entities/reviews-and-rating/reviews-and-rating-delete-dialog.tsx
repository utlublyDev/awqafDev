import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./reviews-and-rating.reducer";

export const ReviewsAndRatingDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const reviewsAndRatingEntity = useAppSelector(
    (state) => state.reviewsAndRating.entity
  );
  const updateSuccess = useAppSelector(
    (state) => state.reviewsAndRating.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/reviews-and-rating");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(reviewsAndRatingEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        data-cy="reviewsAndRatingDeleteDialogHeading"
      >
        <Translate contentKey="entity.delete.title">
          Confirm delete operation
        </Translate>
      </ModalHeader>
      <ModalBody id="falakTybApp.reviewsAndRating.delete.question">
        <Translate
          contentKey="falakTybApp.reviewsAndRating.delete.question"
          interpolate={{ id: reviewsAndRatingEntity.id }}
        >
          Are you sure you want to delete this ReviewsAndRating?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button
          id="jhi-confirm-delete-reviewsAndRating"
          data-cy="entityConfirmDeleteButton"
          color="danger"
          onClick={confirmDelete}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReviewsAndRatingDeleteDialog;

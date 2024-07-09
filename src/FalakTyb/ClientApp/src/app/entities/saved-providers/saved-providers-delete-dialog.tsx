import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./saved-providers.reducer";

export const SavedProvidersDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const savedProvidersEntity = useAppSelector(
    (state) => state.savedProviders.entity
  );
  const updateSuccess = useAppSelector(
    (state) => state.savedProviders.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/saved-providers");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(savedProvidersEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        data-cy="savedProvidersDeleteDialogHeading"
      >
        <Translate contentKey="entity.delete.title">
          Confirm delete operation
        </Translate>
      </ModalHeader>
      <ModalBody id="falakTybApp.savedProviders.delete.question">
        <Translate
          contentKey="falakTybApp.savedProviders.delete.question"
          interpolate={{ id: savedProvidersEntity.id }}
        >
          Are you sure you want to delete this SavedProviders?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button
          id="jhi-confirm-delete-savedProviders"
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

export default SavedProvidersDeleteDialog;

import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Translate } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { getEntity, deleteEntity } from "./push-notifications.reducer";

export const PushNotificationsDeleteDialog = (
  props: RouteComponentProps<{ id: string }>
) => {
  const [loadModal, setLoadModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    setLoadModal(true);
  }, []);

  const pushNotificationsEntity = useAppSelector(
    (state) => state.pushNotifications.entity
  );
  const updateSuccess = useAppSelector(
    (state) => state.pushNotifications.updateSuccess
  );

  const handleClose = () => {
    props.history.push("/push-notifications");
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(pushNotificationsEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        data-cy="pushNotificationsDeleteDialogHeading"
      >
        <Translate contentKey="entity.delete.title">
          Confirm delete operation
        </Translate>
      </ModalHeader>
      <ModalBody id="falakTybApp.pushNotifications.delete.question">
        <Translate
          contentKey="falakTybApp.pushNotifications.delete.question"
          interpolate={{ id: pushNotificationsEntity.id }}
        >
          Are you sure you want to delete this PushNotifications?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button
          id="jhi-confirm-delete-pushNotifications"
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

export default PushNotificationsDeleteDialog;

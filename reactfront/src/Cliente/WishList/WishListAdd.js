import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddWishlistModal = ({ show, handleClose }) => {
  return (
    <Modal size="sm" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Producto Añadido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>El producto se ha añadido a la lista de deseos con éxito.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWishlistModal;
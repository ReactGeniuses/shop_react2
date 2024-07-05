import React, { useState } from "react";
import { Modal, Button,Alert } from "react-bootstrap";

import axios from "axios";

const CATEGORY_URI = "http://localhost:8000/category/";

const DeleteCategoryModal = ({ id, show, handleClose, refreshCategory }) => {
  const [error, setError] = useState('');

  const deleteCategory = async () => {
    try {
      await axios.delete(`${CATEGORY_URI}${id}`);
      handleClose();
      refreshCategory(); // Refresca la lista de productos
    } catch (error) {
      setError('Error al borrar la categoria. Inténtalo nuevamente.');
      console.error("Error al borrar la categoria:", error);
    }
  };

  return (
    <Modal size="sm" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>¿Estás seguro de que deseas eliminar esta categoria?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={deleteCategory}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;
import React, { useState } from "react";
import { Modal, Button,Alert } from "react-bootstrap";

import axios from "axios";

const PRODUCT_URI = "http://localhost:8000/product/";

const DeleteProductModal = ({ id, show, handleClose, refreshProducts }) => {
  const [error, setError] = useState('');

  const deleteProduct = async () => {
    try {
      await axios.delete(`${PRODUCT_URI}${id}`);
      handleClose();
      refreshProducts(); // Refresca la lista de productos
    } catch (error) {
      setError('Error al borrar el producto. Inténtalo nuevamente.');
      console.error("Error al borrar el producto:", error);
    }
  };

  return (
    <Modal size="sm" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={deleteProduct}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
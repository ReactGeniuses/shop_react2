import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";

const SALES_ORDER_URI = "http://localhost:8000/sales/salesorders";

const UpdateStateOrderModal = ({ id, show, handleClose, refreshOrders }) => {
  const [error, setError] = useState('');

  const updateStateOrder = async () => {
    try {
      await axios.put(`${SALES_ORDER_URI}/${id}`, { StateOrder: 'enviado' });
      handleClose();
      refreshOrders(); // Refresca la lista de órdenes de ventas
    } catch (error) {
      setError('Error al actualizar el estado de la orden. Inténtalo nuevamente.');
      console.error("Error al actualizar el estado de la orden:", error);
    }
  };

  return (
    <Modal size="sm" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Estado de Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>¿Estás seguro de que deseas actualizar el estado de esta orden a "enviado"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={updateStateOrder}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStateOrderModal;

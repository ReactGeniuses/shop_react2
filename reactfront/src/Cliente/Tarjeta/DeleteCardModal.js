import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteCardModal = ({ show, handleClose, refreshCards, id }) => {
  const email = useSelector((state) => state.auth.correo);
  const Direccion_URI = "http://localhost:8000/card/";

  const handleDelete = async () => {
    try {
      console.log(id); // Aquí se debería imprimir el id correcto
      await axios.delete(`${Direccion_URI}${email}/${id}`);
      refreshCards();
      handleClose();
    } catch (error) {
      console.error('Error deleting cards:', error);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Tarjeta</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro que deseas eliminar esta tarjeta?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCardModal;
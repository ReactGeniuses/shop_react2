// En el componente DeleteAddressModal
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteAddressModal = ({ show, handleClose, refreshAddresses, id }) => { // Cambié addressId por id
  const email = useSelector((state) => state.auth.correo);
  const Direccion_URI = "http://localhost:8000/direccion/";

  const handleDelete = async () => {
    try {
      console.log(id); // Aquí se debería imprimir el id correcto
      await axios.delete(`${Direccion_URI}${email}/${id}`);
      refreshAddresses();
      handleClose();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Dirección</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Estás seguro que deseas eliminar esta dirección?</Modal.Body>
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

export default DeleteAddressModal;

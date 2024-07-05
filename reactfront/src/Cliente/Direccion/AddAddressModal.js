import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddAddressModal = ({ show, handleClose, refreshAddresses }) => {
  const email = useSelector((state) => state.auth.correo);

  const [formData, setFormData] = useState({
    NombreDireccion: '',
    Pais: '',
    Provincia: '',
    DireccionDescripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Combine formData with email
      const completeFormData = { ...formData, email };
  
      // Post to the URL with email and include email in the request body
      await axios.post(`http://localhost:8000/direccion/${email}`, completeFormData);
      refreshAddresses();
      handleClose();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };
  
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>NombreDireccion</Form.Label>
            <Form.Control
              type="text"
              name="NombreDireccion"
              value={formData.NombreDireccion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pais</Form.Label>
            <Form.Control
              type="text"
              name="Pais"
              value={formData.Pais}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Provincia</Form.Label>
            <Form.Control
              type="text"
              name="Provincia"
              value={formData.Provincia}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>DireccionDescripcion</Form.Label>
            <Form.Control
              type="text"
              name="DireccionDescripcion"
              value={formData.DireccionDescripcion}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditAddressModal = ({ show, handleClose, refreshAddresses, addressId }) => {
    const email = useSelector((state) => state.auth.correo);
    const Direccion_URI = "http://localhost:8000/direccion/";

  const [formData, setFormData] = useState({
    NombreDireccion: '',
    Pais: '',
    Provincia: '',
    DireccionDescripcion: '',
  });

  useEffect(() => {
    const fetchAddress = async () => {
      console.log(addressId);
      if (addressId) {
        try {
            // Combine formData with email
          const res = await axios.get(`http://localhost:8000/direccion/${email}/${addressId}`);
          setFormData(res.data);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
    };
    fetchAddress();
  }, [addressId,email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const completeFormData = { ...formData, email };
      await axios.put(`${Direccion_URI}${email}/${addressId}`, completeFormData);
      refreshAddresses();
      handleClose();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
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

export default EditAddressModal;

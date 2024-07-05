import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

// URIs de la API
const CATEGORY_URI = "http://localhost:8000/category/";

export const AddCategoryModal = ({ show, handleClose, refreshCategory }) => {
  const [formData, setFormData] = useState({
    CategoryName: "",
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(CATEGORY_URI, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleClose();
      refreshCategory(); // Refresca la lista de categorías
    } catch (error) {
      setError('Error al agregar la categoría. Inténtalo nuevamente.');
      console.error("Error al agregar la categoría:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="CategoryName">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Categoría
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;

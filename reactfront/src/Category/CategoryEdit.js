import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const CATEGORY_URI = "http://localhost:8000/category/";

const EditCategoryModal = ({ show, handleClose, refreshCategory, categoryId }) => {
  const [formData, setFormData] = useState({
    CategoryName: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${CATEGORY_URI}${categoryId}`);
        setFormData({
          CategoryName: res.data.CategoryName,
        });
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
      }
    };

    if (show && categoryId) {
      fetchCategory();
    }
  }, [show, categoryId]);

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
      await axios.put(`${CATEGORY_URI}${categoryId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleClose();
      refreshCategory(); // Refresca la lista de categorías
    } catch (error) {
      setError("Error al editar la categoría. Inténtalo nuevamente.");
      console.error("Error al editar la categoría:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
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
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;

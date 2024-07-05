import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

// URIs de la API
const PRODUCT_URI = "http://localhost:8000/product/";
const CATEGORY_URI = "http://localhost:8000/category/";

export const AddProductModal = ({ show, handleClose, refreshProducts }) => {
  const [formData, setFormData] = useState({
    ProductName: "",
    Descripiton1: "",
    Descripiton2: "",
    CategoryId: "",
    Price: "",
    Quantity: "",
    ProductImage: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(CATEGORY_URI);
        setCategories(res.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ProductImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    for (let key in formData) {
      productData.append(key, formData[key]);
    }

    try {
      await axios.post(PRODUCT_URI, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
      refreshProducts(); // Refresca la lista de productos
    } catch (error) {
      setError('Error al agregar el producto. Inténtalo nuevamente.');
      console.error("Error al agregar el producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ProductName">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="Descripiton1">
            <Form.Label>Descripción 1</Form.Label>
            <Form.Control
              type="text"
              name="Descripiton1"
              value={formData.Descripiton1}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="Descripiton2">
            <Form.Label>Descripción 2</Form.Label>
            <Form.Control
              type="text"
              name="Descripiton2"
              value={formData.Descripiton2}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="CategoryId">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="CategoryId"
              value={formData.CategoryId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.Id} value={category.Id}>
                  {category.CategoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="Price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="Quantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="ProductImage">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              type="file"
              name="ProductImage"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Producto
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;

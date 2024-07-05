import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

// URIs de la API
const PRODUCT_URI = "http://localhost:8000/product/";
const CATEGORY_URI = "http://localhost:8000/category/";

const EditProductModal = ({ show, handleClose, refreshProducts, productId }) => {
  const [formData, setFormData] = useState({
    ProductName: "",
    Descripiton1: "",
    Descripiton2: "",
    CategoryId: "",
    Price: "",
    Quantity: "",
    DateAdded: "",
    Vendidos: "",
    ProductImage: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(CATEGORY_URI);
        setCategories(res.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${PRODUCT_URI}${productId}`);
        const data = res.data;
        setProduct(data);
        setFormData({
          ProductName: data.ProductName,
          Descripiton1: data.Descripiton1,
          Descripiton2: data.Descripiton2,
          CategoryId: data.CategoryId,
          Price: data.Price,
          Quantity: data.Quantity,
          DateAdded: data.DateAdded,
          Vendidos: data.Vendidos,
          ProductImage: data.ProductImage, // Mantener la imagen existente
        });
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (show && productId) {
      fetchCategories();
      fetchProduct();
    }
  }, [show, productId]);

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
      if (key === 'ProductImage' && formData.ProductImage) {
        productData.append(key, formData.ProductImage);
      } else if (key !== 'ProductImage') {
        productData.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`${PRODUCT_URI}${productId}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
      refreshProducts(); // Refresca la lista de productos
    } catch (error) {
      setError('Error al editar el producto. Inténtalo nuevamente.');
      console.error("Error al editar el producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {product && (
          <>
            <figure>
              {formData.ProductImage && typeof formData.ProductImage === 'string' && (
                <img
                  src={formData.ProductImage}
                  alt={product.ProductName}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </figure>
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
              <Form.Group controlId="DateAdded">
                <Form.Label>Fecha añadido</Form.Label>
                <Form.Control
                  type="date"
                  name="DateAdded"
                  value={formData.DateAdded}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="Vendidos">
                <Form.Label>cantidad vendida</Form.Label>
                <Form.Control
                  type="number"
                  name="Vendidos"
                  value={formData.Vendidos}
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
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;

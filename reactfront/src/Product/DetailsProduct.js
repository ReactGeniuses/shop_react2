import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

// URIs de la API
const PRODUCT_URI = "http://localhost:8000/product/";
const CATEGORY_URI = "http://localhost:8000/category/";

const ViewProductModal = ({ show, handleClose, productId }) => {
  const [product, setProduct] = useState(null);
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

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${PRODUCT_URI}${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (show && productId) {
      fetchCategories();
      fetchProduct();
    }
  }, [show, productId]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.Id === categoryId);
    return category ? category.CategoryName : "Desconocida";
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {product ? (
          <div>
            <figure>
              {product.ProductImage && (
                <img
                  src={product.ProductImage}
                  alt={product.ProductName}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </figure>
            <Form>
              <Form.Group controlId="ProductName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  value={product.ProductName}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="Descripiton1">
                <Form.Label>Descripción 1</Form.Label>
                <Form.Control
                  type="text"
                  value={product.Descripiton1}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="Descripiton2">
                <Form.Label>Descripción 2</Form.Label>
                <Form.Control
                  type="text"
                  value={product.Descripiton2}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="CategoryId">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={getCategoryName(product.CategoryId)}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="Price">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  value={product.Price}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="Quantity">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="text"
                  value={product.Quantity}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="DateAdded">
                <Form.Label>Fecha Añadido</Form.Label>
                <Form.Control
                  type="text"
                  value={product.DateAdded}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="Vendidos">
                <Form.Label>Cantidad Vendida</Form.Label>
                <Form.Control
                  type="text"
                  value={product.Vendidos}
                  readOnly
                />
              </Form.Group>
            </Form>
          </div>
        ) : (
          <Alert variant="info">Cargando datos del producto...</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProductModal;

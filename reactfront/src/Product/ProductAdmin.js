import React, { useState, useEffect, useCallback } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import AddProductModal from "./ProductAdd"; 
import DeleteProductModal from "./ProductDelete";
import EditProductModal from "./ProductEdit";
import { FaTrash, FaEdit } from "react-icons/fa";

// URI de la API de productos
const URI = "http://localhost:8000/product/";

export const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [searchParams] = useSearchParams();

  const getProducts = useCallback(async () => {
    try {
      const searchId = searchParams.get('id');
      const searchName = searchParams.get('name');
      let res;
      if (searchId) {
        res = await axios.get(`${URI}${searchId}`);
        setProducts([res.data]); // Set an array with one product
      } else if (searchName) {
        res = await axios.get(`${URI}name/${searchName}`); // Actualiza la URL de búsqueda por nombre
        setProducts(res.data);
      } else {
        res = await axios.get(URI);
        setProducts(res.data);
      }
      setError('');
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setError('Error al cargar los productos');
      setProducts([]);
    }
  }, [searchParams]);

  useEffect(() => {
    getProducts();
  }, [searchParams, getProducts]); // Agregar getProducts como dependencia

  const TABLE_HEADERS = ["Código", "Nombre", "Categoría", "Precio", "Cantidad", "Eliminar", "Editar"];

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Producto
      </Button>
      <AddProductModal show={showModal} handleClose={() => setShowModal(false)} refreshProducts={getProducts} />
      {error && (
        <Alert variant="danger" className="mt-3">{error}</Alert>
      )}
      {products.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {TABLE_HEADERS.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.Codigo}>
                <td>{product.Codigo}</td>
                <td>{product.ProductName}</td>
                <td>{product.CategoryId}</td>
                <td>{product.Price}</td>
                <td>{product.Quantity}</td>
                <td>
                  <Button variant="warning" onClick={() => { setProductIdToDelete(product.Codigo); setShowDeleteModal(true); }}>
                    <FaTrash />
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => { setProductIdToEdit(product.Codigo); setShowEditModal(true); }}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <DeleteProductModal 
        id={productIdToDelete} 
        show={showDeleteModal} 
        handleClose={() => setShowDeleteModal(false)} 
        refreshProducts={getProducts} 
      />
      <EditProductModal 
        productId={productIdToEdit} 
        show={showEditModal} 
        handleClose={() => setShowEditModal(false)} 
        refreshProducts={getProducts} 
      />
    </div>
  );
};

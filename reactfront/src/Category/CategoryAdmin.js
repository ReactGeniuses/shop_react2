import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import AddCategoryModal from "./CategoryAdd"; 
import DeleteCategoryModal from "./CategoryDelete";
import EditCategoryModal from "./CategoryEdit";
import { FaTrash, FaEdit } from "react-icons/fa";

// URI de la API de productos
const URI = "http://localhost:8000/category/";

export const AdminCategoryList = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

  const getCategory = async () => {
    try {
      const res = await axios.get(URI);
      setCategory(res.data);
      setError('');
    } catch (error) {
      console.error("Error al cargar las categorias:", error);
      setError('Error al cargar las categorias');
      setCategory([]);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const TABLE_HEADERS = ["Código", "Nombre", "Eliminar", "Editar"];

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Categoría
      </Button>
      <AddCategoryModal show={showModal} handleClose={() => setShowModal(false)} refreshCategory={getCategory} />
      {error && (
        <Alert variant="danger" className="mt-3">{error}</Alert>
      )}
      {category.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {TABLE_HEADERS.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {category.map(category => (
              <tr key={category.Id}>
                <td>{category.Id}</td>
                <td>{category.CategoryName}</td>
                <td>
                  <Button variant="warning" onClick={() => { setCategoryIdToDelete(category.Id); setShowDeleteModal(true); }}>
                    <FaTrash />
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => { setCategoryIdToEdit(category.Id); setShowEditModal(true); }}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <DeleteCategoryModal 
        id={categoryIdToDelete} 
        show={showDeleteModal} 
        handleClose={() => setShowDeleteModal(false)} 
        refreshCategory={getCategory} 
      />
      <EditCategoryModal 
        show={showEditModal} 
        handleClose={() => setShowEditModal(false)} 
        refreshCategory={getCategory} 
        categoryId={categoryIdToEdit} // Paso categoryIdToEdit como prop
      />
    </div>
  );
};

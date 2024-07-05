// SalesOrderList.js
import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import UpdateStateOrderModal from "./StateModal";
import SearchBar from "./SearchBarOrder";
import SearchBarAdmin from "../Menu/SearchOrderAdmin"
import { useSelector } from 'react-redux'; // Import useSelector

// URI de la API de órdenes de ventas
const URI = "http://localhost:8000/sales/salesorders";

export const SalesOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [OrderIdToEdit, setOrderIdToEdit] = useState(null);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  
  const role = useSelector((state) => state.auth.value); // Get the user's role from the state
  
  const getOrders = async () => {
    try {
      const res = await axios.get(URI);
      setOrders(res.data);
      setError('');
    } catch (error) {
      console.error("Error al cargar las órdenes de ventas:", error);
      setError('Error al cargar las órdenes de ventas');
      setOrders([]);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearch = async (term, type) => {
    try {
      const res = await axios.get(`${URI}/search`, { params: { query: term, type } });
      setOrders(res.data);
      setError('');
    } catch (error) {
      console.error("Error al buscar órdenes de ventas:", error);
      setError('Error al buscar órdenes de ventas');
      setOrders([]);
    }
  };

  const handleAdmin = async ({ startDate, endDate }, type) => {
    try {
      // Construir los parámetros con startDate, endDate, y type
      const params = { startDate, endDate, type };
  
      // Hacer la solicitud al backend con los parámetros
      const res = await axios.get(`${URI}/search`, { params });
      
      // Actualizar el estado con los resultados de la búsqueda
      setOrders(res.data);
      setError('');
    } catch (error) {
      console.error("Error al buscar órdenes:", error);
      setError('Error al buscar órdenes');
      setOrders([]);
    }
  };
  
  const TABLE_HEADERS = role === 1
  ? ["ID Orden", "Email Usuario","Nombre", "Direccion","OrderDate","StateOrder"]
  : ["ID Orden", "Email Usuario","Nombre", "Direccion","OrderDate","StateOrder", "Despachar"];

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Componente de barra de búsqueda */}
      {role !== 1 && <SearchBar onSearch={handleSearch} />}
      {role === 1 && <SearchBarAdmin onSearch={handleAdmin} />}

      {/* Tabla de órdenes */}
      {orders.length > 0 ? (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {TABLE_HEADERS.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.ID_Order}>
                <td>{order.ID_Order}</td>
                <td>{order.EmailUser}</td>
                <td>{order.Nombre}</td>
                <td>{order.Direccion}</td>
                <td>{order.OrderDate}</td>
                <td>{order.StateOrder}</td>
                <td>
                  {role !== 1 && (
                    <Button variant="success" onClick={() => { setOrderIdToEdit(order.ID_Order); setShowUpdateModal(true); }}>
                      <FaCheck />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="mt-3">
          No se encontraron resultados
        </Alert>
      )}

      {role !== 1 && (
        <UpdateStateOrderModal 
          id={OrderIdToEdit} 
          show={ShowUpdateModal} 
          handleClose={() => setShowUpdateModal(false)} 
          refreshCategory={getOrders} 
        />
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useSelector } from 'react-redux';
import SearchOrder from './SearchOrder';
import { FaCheck } from "react-icons/fa";
import OrderDetailsModal from './OrderDetailsModal';

const URI = "http://localhost:8000/sales/salesorders/";
const URLEMAIL = "http://localhost:8000/sales/salesorders/email/";

const SalesOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.value);
  const email = useSelector((state) => state.auth.correo);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${URLEMAIL}${email}`);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setOrders(data);
      setError('');
    } catch (error) {
      console.error("Error al cargar las órdenes de ventas:", error);
      setError('Error al cargar las órdenes de ventas');
      setOrders([]);
    }
  };

  const getOrderReceipt = async (id) => {
    try {
      console.log(id);
      const res = await axios.get(`${URI}receipt/${id}`);
      console.log(res.data);

      // Acceder directamente a las propiedades 'order' y 'orderDetails'
      const orderData = {
        order: res.data.order,
        details: res.data.orderDetails
      };

      setOrderDetails(orderData);
      setError('');
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener el recibo de la orden:", error);
      setError('Error al obtener el recibo de la orden');
      setOrderDetails(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn && email) {
      getOrders();
    }
  }, [isLoggedIn, role, email]);

  const handleSearch = async (term) => {
    try {
      console.log(term);
      const res = await axios.get(`${URI}${term}`);
      console.log(res);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setOrders(data);
      setError('');
    } catch (error) {
      console.error("Error al buscar órdenes de ventas:", error);
      setError('Error al buscar órdenes de ventas');
      setOrders([]);
    }
  };

  const TABLE_HEADERS = ["ID Orden", "Email Usuario", "Nombre", "Direccion", "OrderDate", "StateOrder", "Total", "Detalles"];

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Componente de barra de búsqueda */}
      {!isLoggedIn && <SearchOrder onSearch={handleSearch} />}

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
                <td>{order.Total}</td>
                <td>
                  {role !== 1 && (
                    <Button variant="success" onClick={() => getOrderReceipt(order.ID_Order)}>
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

      <OrderDetailsModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        orderDetails={orderDetails} 
      />
    </div>
  );
};

export default SalesOrderList;

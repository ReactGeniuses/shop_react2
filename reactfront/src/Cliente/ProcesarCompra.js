import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Usuario_URI = "http://localhost:8000/usuario/";
const ORDER_URI = "http://localhost:8000/sales/salesorders";
const DETAIL_URI = "http://localhost:8000/sales/salesordersdetails";
const Direccion_URI = "http://localhost:8000/direccion/";
const CARD_URI = "http://localhost:8000/card/";


const UserForm = () => {
  const defaultState = {
    nombre: '',
    direccion: '',
    tarjetaCredito: '',
  };

  const [formData, setFormData] = useState(defaultState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [idOrder, setIdOrder] = useState(null);
  const role = useSelector((state) => state.auth.value);
  const email = useSelector((state) => state.auth.correo);
  const cartItems = useSelector((state) => state.cart.items);
  const [direcciones, setDirecciones] = useState([]);
  const [tarjetas, setTarjetasCredito] = useState([]);

  const saleOrderMeth = async () => {
    try {
      const requestData = {
        EmailUser: role === 3 ? email : null,
        Nombre: formData.nombre,
        Direccion: formData.direccion
      };

      const response = await axios.post(ORDER_URI, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIdOrder(response.data.ID_Order);
      return response.data.ID_Order;
    } catch (error) {
      setError('Error in creating sales order');
      console.error("Error in creating sales order:", error);
    }
  };

  const createSalesOrderDetails = async (idOrder, cartItems) => {
    try {
      const promises = cartItems.map(item => {
        return axios.post(DETAIL_URI, {
          ID_Order: idOrder,
          ProductID: item.Codigo,
          Price: item.Price,
          Quantity: item.quantity
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      });

      await Promise.all(promises);
      setSuccess('Order and details created successfully');
    } catch (error) {
      setError('Error in creating sales order details');
      console.error("Error in creating sales order details:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (role === 3) {
        try {
          const res = await axios.get(`${Usuario_URI}${email}`);
          const account = res.data;
          setFormData({
            nombre: account.Nombre,
            direccion: account.Direccion,
          });

          const cardRes = await axios.get(`${CARD_URI}${email}`);
          setFormData({ ...formData, tarjetaCredito: cardRes.data });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchDirections = async () => {
      try {
        const res = await axios.get(`${Direccion_URI}${email}`);
        setDirecciones(res.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const fetchCreditCards = async () => {
      try {
        const res = await axios.get(`${CARD_URI}${email}`);
        setTarjetasCredito(res.data);
      } catch (error) {
        console.error("Error fetching credit cards:", error);
      }
    };

    fetchUserData();
    fetchDirections();
    fetchCreditCards();
  }, [role, email]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.nombre || !formData.direccion || !formData.tarjetaCredito) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const orderId = await saleOrderMeth();
      if (orderId) {
        await createSalesOrderDetails(orderId, cartItems);
      }
    } catch (error) {
      setError('Error al enviar los datos');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form className='user-form' onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={formData.nombre}
          onChange={onInputChange}
          name="nombre"
          placeholder="Ingrese su nombre"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDireccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          as="select"
          name="direccion"
          value={formData.direccion}
          onChange={onInputChange}
          placeholder="Ingrese su dirección"
        >
          <option value="">Selecciona una direccion</option>
          {direcciones.map((direccion) => (
            <option key={direccion.Id} value={direccion.DireccionDescripcion}>
              {direccion.NombreDireccion}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTarjetaCredito">
        <Form.Label>Tarjetas</Form.Label>
        <Form.Control
          as="select"
          name="tarjetaCredito"
          value={formData.TipoTarjeta}
          onChange={onInputChange}
          placeholder="Seleccione su tarjeta de crédito"
        >
          <option value="">Selecciona una tarjeta de crédito</option>
          {tarjetas.map((tarjeta) => (
            <option key={tarjeta.TarjetaId} value={tarjeta.NumeroTarjeta}>
              {tarjeta.NumeroTarjeta} - Últimos tres dígitos: {tarjeta.UltimosTresNumeros}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Button variant="primary" type="submit">
        Enviar
      </Button>
      {cartItems.length > 0 && (
        <Table striped bordered hover className='mt-4'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.Codigo}>
                <td>{item.Codigo}</td>
                <td>{item.ProductName}</td>
                <td>${item.Price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Form>
  );
};

export default UserForm;

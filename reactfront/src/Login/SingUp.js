import React, { useState } from 'react';
import axios from 'axios';
import AddCardModal from '../Cliente/Tarjeta/AddCardModal';
import { logIn } from '../Store/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

const Signup = () => {
  const Usuario_URI = "http://localhost:8000/usuario/";
  const ACCOUNT_URI = "http://localhost:8000/account/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Nombre: '',
    Email: '',
    AccountPassword: '',
    AccountRole: '3',
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const createAccount = async () => {
    try {
      const accountResponse = await axios.post(ACCOUNT_URI, {
        Email: form.Email,
        AccountPassword: form.AccountPassword,
        AccountRole: form.AccountRole
      });
      return accountResponse;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al crear la cuenta. Por favor, inténtalo de nuevo.");
    }
  };

  const createUsuario = async () => {
    try {
      const usuarioResponse = await axios.post(Usuario_URI, {
        Email: form.Email,
        Nombre: form.Nombre
      });
      return usuarioResponse;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al crear el usuario");
    }
  };

  const handleProduct = () => {
    navigate("/");
  };

  const handleAccount = () => {
    navigate("/cuenta");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!form.Nombre) {
      validationErrors.push("El Nombre es requerido");
    }
    if (!form.Email) {
      validationErrors.push("El Email es requerido");
    }
    if (!form.AccountPassword) {
      validationErrors.push("La Contraseña es requerida");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createAccount();
      await createUsuario();
      dispatch(logIn({ role: 3, correo: form.Email }));

      setShowSuccessModal(true);
      setErrors([]);
      setSuccessMessage('¡Cuenta creada con éxito!');

    } catch (error) {
      setErrors([error.message]);
    }
  };

  const handleCloseModal = () => {
    setShowAddCardModal(false);
  };

  const handleShowModal = () => {
    setShowAddCardModal(true);
  };

  return (
    <div className="App">
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Nombre">Nombre:</label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="AccountPassword">Contraseña:</label>
          <input
            type="password"
            id="AccountPassword"
            name="AccountPassword"
            value={form.AccountPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      {errors.length > 0 && (
        <div className="errors">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {successMessage && (
        <div className="success">
          <p>{successMessage}</p>
        </div>
      )}

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Cuenta Creada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ha creado correctamente su cuenta, ¿desea agregar más datos o quiere proceder a ver los productos?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleProduct}>
            Ir a Productos
          </Button>
          <Button variant="primary" onClick={handleAccount}>
            Administrar Cuenta
          </Button>
          <Button variant="primary" onClick={handleShowModal}>
            Agregar Tarjeta
          </Button>
        </Modal.Footer>
      </Modal>

      <AddCardModal
        show={showAddCardModal}
        handleClose={handleCloseModal}
      />
      
    </div>
  );
}

export default Signup;

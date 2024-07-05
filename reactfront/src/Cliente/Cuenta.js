import React, { useState, useEffect } from "react";
import { Button, Form, Alert, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddAddressModal from "./Direccion/AddAddressModal";
import EditAddressModal from "./Direccion/EditAddressModal";
import DeleteAddressModal from "./Direccion/DeleteAddressModal";
import AddCardModal from "./Tarjeta/AddCardModal";
import EditCardModal from "./Tarjeta/EditCardModal";
import DeleteCardModal from "./Tarjeta/DeleteCardModal";
import { FaTrash, FaEdit } from "react-icons/fa";

const Usuario_URI = "http://localhost:8000/usuario/";
const Direccion_URI = "http://localhost:8000/direccion/";
const Card_URI = "http://localhost:8000/card/";

const UserProfileForm = () => {
  const defaultState = {
    Nombre: "",
  };

  const [formData, setFormData] = useState(defaultState);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);
  const [addressIdToEdit, setAddressIdToEdit] = useState(null);
  const [addressIdToDelete, setAddressIdToDelete] = useState(null);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  const [cardToEdit, cardToDelete] = useState(null);
  const [cardIdToEdit, setCardIdToEdit] = useState(null); 
  const [cardIdToDelete, setCardIdToDelete] = useState(null)
  const role = useSelector((state) => state.auth.value);
  const email = useSelector((state) => state.auth.correo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (role === 3 && isLoggedIn) {
        try {
          const res = await axios.get(`${Usuario_URI}${email}`);
          const account = res.data;
          setFormData({
            Nombre: account.Nombre,
          });
          const res2 = await axios.get(`${Direccion_URI}${email}`);
          setAddresses(res2.data);
          const res3 = await axios.get(`${Card_URI}${email}`);
          setCards(res3.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else if (!isLoggedIn) {
        setShowAuthModal(true);
      }
    };

    fetchUserData();
  }, [role, email, isLoggedIn]);

  const handleShowModal = (field) => {
    setFieldToEdit(field);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFieldToEdit(null);
  };

  const handleCloseAuthModal = () => {
    navigate("/");
  };

  const handleAuthAccept = () => {
    navigate("/Signup");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const onModalInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const errors = [];
    if (!formData.Nombre) {
      errors.push("El Nombre es requerido");
    }

    if (errors.length === 0) {
      try {
        await axios.put(`${Usuario_URI}${email}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSuccess("Datos actualizados exitosamente");
        handleCloseModal();
      } catch (error) {
        console.error("Error updating user data:", error);
        errors.push("Error al actualizar los datos");
      }
    }

    setErrors(errors);
  };

  const refreshAddresses = async () => {
    try {
      const res = await axios.get(Direccion_URI);
      setAddresses(res.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleEditCard = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${Card_URI}${email}${cardToEdit.id}`, formData);
      refreshCards();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating card:", error);
      setErrors(["Error al actualizar la tarjeta"]);
    }
  };

  const handleDeleteCard = async () => {
    try {
      await axios.delete(`${Card_URI}${email}${cardToDelete.id}`);
      refreshCards();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting card:", error);
      setErrors(["Error al eliminar la tarjeta"]);
    }
  };

  const refreshCards = async () => {
    try {
      const res = await axios.get(`${Card_URI}${email}`);
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Para administar su cuenta necesita una. obviamente. ¿Desea crear una o logearse??
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAuthModal}>
              Regresar a los productos
            </Button>
            <Button variant="primary" onClick={handleAuthAccept}>
              Crear
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Iniciar Sesion
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <>
          <Form className="user-form" onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={formData.Nombre} readOnly />
              <Button variant="link" onClick={() => handleShowModal("Nombre")}>
                Editar
              </Button>
            </Form.Group>
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Alert key={index} variant="danger">
                  {error}
                </Alert>
              ))}
            {success && <Alert variant="success">{success}</Alert>}
          </Form>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Editar {fieldToEdit}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>{fieldToEdit}</Form.Label>
                  <Form.Control
                    type="text"
                    name={fieldToEdit}
                    value={formData[fieldToEdit] || ""}
                    onChange={onModalInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onSubmitHandler}>
                Guardar cambios
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="container mt-4">
            <Button
              variant="primary"
              onClick={() => setShowAddAddressModal(true)}
            >
              Agregar Dirección
            </Button>
            <AddAddressModal
              show={showAddAddressModal}
              handleClose={() => setShowAddAddressModal(false)}
              refreshAddresses={refreshAddresses}
            />
            <Button
              variant="primary"
              onClick={() => setShowAddCardModal(true)}
              className="mt-3"
            >
              Agregar Tarjeta
            </Button>

            <AddCardModal
              show={showAddCardModal}
              handleClose={() => setShowAddCardModal(false)}
              refreshCards={refreshCards}
            />

            {addresses.length > 0 && (
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Dirección</th>
                    <th>País</th>
                    <th>Provincia</th>
                    <th>Descripción</th>
                    <th>Eliminar</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((address) => (
                    <tr key={address.DireccionId}>
                      <td>{address.DireccionId}</td>
                      <td>{address.NombreDireccion}</td>
                      <td>{address.Pais}</td>
                      <td>{address.Provincia}</td>
                      <td>{address.DireccionDescripcion}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            setAddressIdToDelete(address.DireccionId);
                            setShowDeleteAddressModal(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setAddressIdToEdit(address.DireccionId);
                            setShowEditAddressModal(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <DeleteAddressModal
              id={addressIdToDelete}
              show={showDeleteAddressModal}
              handleClose={() => setShowDeleteAddressModal(false)}
              refreshAddresses={refreshAddresses}
            />
            <EditAddressModal
              show={showEditAddressModal}
              handleClose={() => setShowEditAddressModal(false)}
              refreshAddresses={refreshAddresses}
              addressId={addressIdToEdit}
            />
          </div>

          {cards.length > 0 && (
            <Table striped bordered hover className="mt-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Titular</th>
                  <th>Tipo de Tarjeta</th>
                  <th>Número</th>
                  <th>CVV</th>
                  <th>Eliminar</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.TarjetaId}>
                    <td>{card.TarjetaId}</td>
                    <td>{card.NombreTitular}</td>
                    <td>{card.TipoTarjeta}</td>
                    <td>{card.NumeroTarjeta}</td>
                    <td>{card.UltimosTresNumeros}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setCardIdToDelete(card.TarjetaId);
                          setShowDeleteCardModal(true);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setCardIdToEdit(card.TarjetaId);
                          setShowEditCardModal(true);
                        }}
                      >
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <DeleteCardModal
            id={cardIdToDelete}
            show={showDeleteCardModal}
            handleClose={() => setShowDeleteCardModal(false)}
            refreshCards={refreshCards}
            handleDeleteCard={handleDeleteCard}
          />
          <EditCardModal
            show={showEditCardModal}
            handleClose={() => setShowEditCardModal(false)}
            refreshCards={refreshCards}
            cardId={cardIdToEdit}
            handleEditCard={handleEditCard}
          />
        </>
      )}
    </>
  );
};

export default UserProfileForm;

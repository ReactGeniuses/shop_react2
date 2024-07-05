import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import axios from 'axios';
import DeleteWishlistModal from './WishListDelete';

const PRODUCT_URI = "http://localhost:8000/product/";
const WISH_URI = "http://localhost:8000/wish/";

const Wishlist = () => {
  const email = useSelector((state) => state.auth.correo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      if (!isLoggedIn) {
        setShowAuthModal(true);
      } else {
        const res = await axios.get(`${WISH_URI}${email}`);
        const wishlistItems = res.data; // Obtener los ítems con WishID y ProductID

        const productPromises = wishlistItems.map((item) =>
          axios.get(`${PRODUCT_URI}${item.ProductID}`).then(response => ({
            ...response.data,
            WishID: item.WishID // Añadir WishID a cada producto
          }))
        );
        const products = await Promise.all(productPromises);

        setWishlistItems(products);
        setError('');
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setError('Error al cargar los productos');
      setWishlistItems([]);
    }
  }, [email, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      fetchWishlist();
    }
  }, [fetchWishlist, isLoggedIn]);

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${WISH_URI}item/${item.WishID}`);
      setWishlistItems((prev) => prev.filter((p) => p.WishID !== item.WishID));
      setShowModal(false);
    } catch (error) {
      console.error("Error al eliminar el producto de la wishlist:", error);
      setError('Error al eliminar el producto de la wishlist');
    }
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
  const handleShow = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      {!isLoggedIn ? (
        <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Para hacer uso de la lista de deseos tiene que tener una cuenta. ¿Desea crear una cuenta o iniciar sesión?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAuthModal}>
              Regresar a los productos
            </Button>
            <Button variant="primary" onClick={handleAuthAccept}>
              Crear
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div className="container-items">
          {error && (
            <div className="alert alert-danger mt-3">{error}</div>
          )}
          {wishlistItems.map((item) => (
            <div className="item" key={item.WishID}>
              <figure>
                {item.ProductImageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${item.ProductImageBase64}`}
                    alt={item.ProductName}
                  />
                )}
              </figure>
              <div className="info-product">
                <h2>{item.ProductName}</h2>
                <p className="price">${item.Price}</p>
                <p className="Descripcion1">{item.Descripcion1}</p>
                <p className="Descripcion2">{item.Descripcion2}</p>
                <p className="stock">Stock: {item.Quantity}</p>
                <button onClick={() => handleShow(item)}>
                  Eliminar de la lista de deseos
                </button>
              </div>
            </div>
          ))}
          {itemToDelete && (
            <DeleteWishlistModal
              show={showModal}
              handleClose={handleClose}
              handleDelete={() => handleDelete(itemToDelete)}
              product={itemToDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Wishlist;

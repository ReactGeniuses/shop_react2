// Carrito.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, clearCart, incrementQuantity, decrementQuantity } from '../Store/cartSlice';
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, count } = useSelector((state) => state.cart);

  const onDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const onCleanCart = () => {
    dispatch(clearCart());
  };

  const onIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const onDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleCheckout = () => {
    navigate('/compra'); // Navigate to admin dashboard
  };

  return (
    <header>
      <h1 className="otros-titulos">Tienda</h1>

      <div className='container-icon'>
        <div
          className='container-cart-icon'
          onClick={() => setActive(!active)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='icon-cart'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          <div className='count-products'>
            <span id='contador-productos'>{count}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${
            active ? '' : 'hidden-cart'
          }`}
        >
          {items.length ? (
            <>
              <div className='row-product'>
                {items.map(product => (
                  <div className='cart-product' key={product.Codigo}>
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>
                        {product.quantity}
                      </span>
                      <p className='titulo-producto-carrito'>
                        {product.ProductName}
                      </p>
                      <span className='precio-producto-carrito'>
                        ${product.Price}
                      </span>
                    </div>
                    <div className='cart-product-actions'>
                      <button onClick={() => onDecrementQuantity(product.Codigo)}>-</button>
                      <button onClick={() => onIncrementQuantity(product.Codigo)}>+</button>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='icon-close'
                        onClick={() => onDeleteProduct(product.Codigo)}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>

              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>

              <button className='btn-checkout' onClick={handleCheckout}>
                Checkout
              </button>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};

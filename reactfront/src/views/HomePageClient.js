// HomePageClient.js
import React from 'react';
import { Carrito } from '../Product/Carrito';
import { ProductList } from '../Product/ProductList';

const HomePageClient = () => {
  return (
    <>
      <Carrito />
      <ProductList />
    </>
  );
};

export default HomePageClient;

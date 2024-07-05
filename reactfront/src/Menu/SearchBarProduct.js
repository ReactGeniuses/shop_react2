import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nombre');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Row>
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="categoria">Categoria</option>
            <option value="nombre">Nombre Producto</option>
            <option value="Descripiton">Descripcion del producto</option>
          </Form.Control>
        </Col>
        <Col md={1}>
          <Button type="submit" variant="primary">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;

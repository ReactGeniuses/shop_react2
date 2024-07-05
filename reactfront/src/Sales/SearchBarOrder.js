import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ID_Order');

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
            <option value="ID_Order">ID Orden</option>
            <option value="EmailUser">Email Usuario</option>
            <option value="OrderDate">Fecha de Orden</option>
            <option value="StateOrder">Estado de Orden</option>
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

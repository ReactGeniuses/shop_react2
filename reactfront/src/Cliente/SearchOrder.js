import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchOrder = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Row>
        <Col md={10}>
          <Form.Control
            type="text"
            placeholder="Ingrese ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchOrder;

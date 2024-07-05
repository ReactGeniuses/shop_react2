import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBarAdmin = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("RangoFecha");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
      onSearch({ startDate, endDate }, searchType);
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Row>
        <Col md={8}>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Fecha de Inicio"
            className="mb-2"
          />
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Fecha de Fin"
          />
        </Col>
        <Col md={3}>
          <Form.Control
            as="select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            
            <option value="RangoFecha">Fecha de Orden</option>
           
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

export default SearchBarAdmin;

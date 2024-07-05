import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddCardModal = ({ show, handleClose}) => {
    const email = useSelector((state) => state.auth.correo);

    const [formData, setFormData] = useState({
        TipoTarjeta: '',
        NombreTitular: '',
        NumeroTarjeta: '',
        UltimosTresNumeros: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const completeFormData = {
                ...formData,
                email
            };

            // Post to the URL with email and include email in the request body
            await axios.post(`http://localhost:8000/card/${email}`, completeFormData);
            handleClose();
        } catch (error) {
            console.error('Error adding cards:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Tarjeta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Tipo de Tarjeta</Form.Label>
                        <Form.Select
                            name="TipoTarjeta"
                            value={formData.TipoTarjeta}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Debito">Debito</option>
                            <option value="Credito">Credito</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre del Titular</Form.Label>
                        <Form.Control
                            type="text"
                            name="NombreTitular"
                            value={formData.NombreTitular}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Número de Tarjeta</Form.Label>
                        <Form.Control
                            type="text"
                            name="NumeroTarjeta"
                            value={formData.NumeroTarjeta}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            type="text"
                            name="UltimosTresNumeros"
                            value={formData.UltimosTresNumeros}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCardModal;

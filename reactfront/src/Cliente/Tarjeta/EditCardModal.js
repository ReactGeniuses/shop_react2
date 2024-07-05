import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditCardModal = ({ show, handleClose, refreshCards, cardId }) => {
    const email = useSelector((state) => state.auth.correo);
    const Card_URI = "http://localhost:8000/card/";

    const [formData, setFormData] = useState({
        TipoTarjeta: '',
        NombreTitular: '',
        NumeroTarjeta: '',
        UltimosTresNumeros: '',
    });

    useEffect(() => {
        const fetchCards = async () => {
            console.log(cardId);
            if (cardId) {
                try {
                    // Combine formData with email
                    const res = await axios.get(`${Card_URI}${email}/${cardId}`);
                    setFormData(res.data);
                } catch (error) {
                    console.error('Error fetching address:', error);
                }
            }
        };
        fetchCards();
    }, [cardId, email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const completeFormData = { ...formData, email };
            await axios.put(`${Card_URI}${email}/${cardId}`, completeFormData);
            refreshCards();
            handleClose();
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    /* TipoTarjeta: '',
        NombreTitular: '',
        NumeroTarjeta: '',
        UltimosTresNumeros: '', */

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Tarjeta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre de Titular</Form.Label>
                        <Form.Control
                            type="text"
                            name="NombreTitular"
                            value={formData.NombreTitular}
                            onChange={handleChange}
                        />
                    </Form.Group>
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
                        <Form.Label>Número</Form.Label>
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

export default EditCardModal;

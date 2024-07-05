import express from 'express';
import { getAllCards, getCardById, createCard, updateCard, deleteCard } from '../Controllers/CardController.js'

const router = express.Router();

router.get('/:email', getAllCards); // Obtener todas las tarjetas de un usuario por email
router.get('/:email/:id', getCardById); // Obtener una tarjeta específica por email y id
router.post('/:email', createCard); // Crear una nueva tarjeta para un usuario
router.put('/:email/:id', updateCard); // Actualizar una tarjeta existente por email y id
router.delete('/:email/:id', deleteCard); // Eliminar una tarjeta por email y id

export default router;
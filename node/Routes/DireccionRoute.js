import express from 'express';
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } from '../Controllers/DireccionController.js';

const router = express.Router();

router.get('/:email', getAllAddresses); // Cambié la ruta para que use el email
router.get('/:email/:id', getAddressById); // Cambié la ruta para que use el email y el id
router.post('/:email', createAddress);
router.put('/:email/:id', updateAddress); // Cambié la ruta para que use el email y el id
router.delete('/:email/:id', deleteAddress); // Cambié la ruta para que use el email y el id

export default router;

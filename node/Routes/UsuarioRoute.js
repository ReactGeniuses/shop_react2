import express from 'express';
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../Controllers/UsuarioController.js';

const router = express.Router();

router.get('/', getAllUsuarios);
router.get('/:email', getUsuario);
router.post('/', createUsuario);
router.put('/:email', updateUsuario);
router.delete('/:email', deleteUsuario);

export default router;

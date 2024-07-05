import express from 'express';
import { getAllAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../Controllers/AccountController.js';

const router = express.Router();

router.get('/', getAllAccounts);
router.get('/:email', getAccount);
router.post('/', createAccount);
router.put('/:email', updateAccount);
router.delete('/:email', deleteAccount);

export default router;

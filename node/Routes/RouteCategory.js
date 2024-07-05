import express from 'express';
import { getAllCategories, getCategory, deleteCategory, updateCategory, createCategory } from '../Controllers/CategoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
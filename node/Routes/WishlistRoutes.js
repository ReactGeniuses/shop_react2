import express from 'express';
import { getAllWishlistItems, getWishlistItemById, addWishlistItem, deleteWishlistItem } from '../Controllers/WishlistController.js';

const router = express.Router();

router.get('/:email', getAllWishlistItems);
router.get('/item/:id', getWishlistItemById);
router.post('/', addWishlistItem);
router.delete('/item/:id', deleteWishlistItem);

export default router;

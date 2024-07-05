import express from 'express'
import multer from 'multer';
import { getAllProducts, getProduct, getProductByName, deleteProduct, updateProduct, createProduct,searchProducts } from '../Controllers/ProductController.js'
const router = express.Router()

const storage = multer.memoryStorage(); // Almacena la imagen en memoria
const upload = multer({ storage: storage });

router.get('/', getAllProducts)
router.get('/search', searchProducts);
router.get('/:id', getProduct)
router.get('/name/:name', getProductByName) // Cambia esta línea para evitar conflictos
// router.get('/date-range', getProductByDateRange) // Nueva ruta para la búsqueda por rango de fechas
router.post('/', upload.single('ProductImage'), createProduct);
router.put('/:id',upload.single('ProductImage'), updateProduct)
router.delete('/:id', deleteProduct)

export default router
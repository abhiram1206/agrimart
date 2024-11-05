import express from 'express';
import { addProduct, bulkAddProductsWithImages, deleteProduct, getProducts, updateProduct, upload } from '../controllers/productController.js';
import { body } from 'express-validator';
import multer from 'multer';

const productRoute = express.Router();
productRoute.post(
    '/addProduct',
    upload.single('productImage'), // Handle image upload
    [
        body('Name').notEmpty().withMessage('Name is required'),
        body('Category').notEmpty().withMessage('Category is required'),
        body('Description').notEmpty().withMessage('Description is required'),
        body('Price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('offerPrice').isFloat({ gt: 0 }).withMessage('Offer Price must be a positive number'),
        body('Quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
        body('MinQuantity').isInt({ gt: 0 }).withMessage('Min Quantity must be a positive integer'),
        body('HarvestedDate').isDate().withMessage('Harvested Date must be a valid date'),
        body('selfLife').isInt({ gt: 0 }).withMessage('Self Life must be a positive integer'),
        body('packaging').notEmpty().withMessage('Packaging is required')
    ],
    addProduct
);

productRoute.get('/getProduct', getProducts);
productRoute.put('/updateProduct/:productId', upload.single('productImage'), updateProduct);
productRoute.delete('/deleteProduct/:productId', deleteProduct)
const uploads = multer({ dest: 'uploads/' }); // Temporary folder

// Route to handle Excel and image file uploads
productRoute.post(
    '/bulkAddProductsWithImages',
    uploads.fields([{ name: 'file', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
    bulkAddProductsWithImages
);

export default productRoute;

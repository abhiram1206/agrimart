import mongoose from 'mongoose';
import Product from '../models/ProductModel.js';
import { validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import xlsx from 'xlsx';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File must be an image'), false);
    }
};

export const upload = multer({ storage, fileFilter });

export const addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Category, Description, Price, offerPrice, Quantity, MinQuantity, HarvestedDate, selfLife, packaging } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Product image is required' });
    }

    try {
        const newProduct = new Product({
            Name,
            Category,
            Description,
            Price,
            offerPrice,
            Quantity,
            MinQuantity,
            HarvestedDate,
            selfLife,
            packaging,
            productImage: req.file.path  
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getProducts = async (req, res) => {
    try {
        let products = await Product.find({})
        res.send({status: "ok", data: products})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateProduct = async (req, res) => {
    const { productId } = req.params; // Assuming you'll pass product ID in URL params
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updateData = {
            Name: req.body.Name,
            Category: req.body.Category,
            Description: req.body.Description,
            Price: req.body.Price,
            offerPrice: req.body.offerPrice,
            Quantity: req.body.Quantity,
            MinQuantity: req.body.MinQuantity,
            HarvestedDate: req.body.HarvestedDate,
            selfLife: req.body.selfLife,
            packaging: req.body.packaging
        };

        // If a new image is uploaded, update the image path
        if (req.file) {
            updateData.productImage = req.file.path;
        }

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true } // Returns the updated document and runs validation
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteProduct = async (req, res) => {
    const { productId } = req.params; 

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const bulkAddProductsWithImages = async (req, res) => {
    if (!req.files || !req.files.file || !req.files.images) {
        return res.status(400).json({ error: 'Excel file and images are required' });
    }

    try {
        // Step 1: Parse the Excel file
        const workbook = xlsx.readFile(req.files.file[0].path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const productsData = xlsx.utils.sheet_to_json(sheet);

        // Step 2: Map product data and associate images
        const images = req.files.images;
        const products = productsData.map((row) => {
            // Find the corresponding image file for each product by name or another identifier
            const imageFile = images.find(
                (image) => path.parse(image.originalname).name === row.imageIdentifier
            );

            if (!imageFile) {
                throw new Error(`Image not found for product ${row.Name}`);
            }

            // Map Excel data to product schema
            return {
                Name: row.Name,
                Category: row.Category,
                Description: row.Description,
                Price: parseFloat(row.Price),
                offerPrice: parseFloat(row.offerPrice),
                Quantity: parseInt(row.Quantity, 10),
                MinQuantity: parseInt(row.MinQuantity, 10),
                HarvestedDate: new Date(row.HarvestedDate),
                selfLife: parseInt(row.selfLife, 10),
                packaging: row.packaging,
                productImage: imageFile.path // Store image path
            };
        });

        // Step 3: Bulk insert products into the database
        const createdProducts = await Product.insertMany(products);

        // Cleanup: Remove the uploaded Excel file and images
        fs.unlinkSync(req.files.file[0].path);
        images.forEach((image) => fs.unlinkSync(image.path));

        res.status(201).json({
            message: 'Products added successfully with images',
            products: createdProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// authRoute.js
import express from 'express';
import { deleteSeller, newSeller, sellerDetails } from '../controllers/sellerController.js';

const sellerRoute = express.Router();

sellerRoute.post('/newSeller', newSeller)
sellerRoute.get('/sellerList', sellerDetails)
sellerRoute.get('/deleteSeller/:sellerId/:userId', deleteSeller)

export default sellerRoute;

// server.js
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoute.js';
import userAuthRouter from './routes/userAuthRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import path from 'path';
import productRoute from './routes/productRoute.js';

const app = express();

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/auth', authRouter);
app.use('/userauth', userAuthRouter)
app.use('/seller', sellerRoute)
app.use('/product', productRoute)

mongoose.connect(process.env.MONGODB_SERVER_PORT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.SERVER_PORT))
    .then(() => {
        console.log(`Connected to Database and listening on ${process.env.SERVER_PORT}`)
    })
    .catch((err) => console.log(err))

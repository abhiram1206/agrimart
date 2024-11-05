import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    MinQuantity: {
        type: Number,
        required: true,
    },
    HarvestedDate: {
        type: Date,
        required: true,
    },
    selfLife: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    packaging: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Products', ProductSchema)
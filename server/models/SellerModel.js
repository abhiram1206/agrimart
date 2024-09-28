import mongoose, { Schema } from "mongoose";

// Define Seller schema
const SellerSchema = new Schema({
    UserDetails: {
        firstName : { type: String },
        lastName : { type: String },
        mobile : { type: Number },
        email : { type: String },
        alternativeEmail : { type: String },
        AddressLine1 : { type: String },
        AddressLine2 : { type: String },
        locality : { type: String },
        City : { type: String },
        ZipCode : { type: Number }
    },
    BusinessDetails: {
        BusinessName : { type: String },
        gstno : { type: String },
        BusinessType : { type: String },
        panoraadhar : { type: String },
        BusinessNumber : { type: Number },
        BusinessAddressLine1 : { type: String },
        BusinessAddressLine2 : { type: String },
        Businesslocality : { type: String },
        BusinessCity : { type: String },
        BusinessZipCode : { type: Number }
    },
    BankDetails: {
        BankName : { type: String },
        AccountHolderName : { type: String },
        ifsccode : { type: String },
        Banklocality : { type: String },
        accountNumber : { type: Number },
        cvv : { type: Number },
        expirydate : { type: Date }
    }
}, { timestamps: true });

export const Seller = mongoose.model('Seller', SellerSchema);
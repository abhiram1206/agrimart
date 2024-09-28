import { Seller } from "../models/SellerModel.js";
import User from '../models/UserModel.js';


export const newSeller = async (req, res) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const accountNumberRegex = /^\d{9,18}$/; 
    
    try {
        const { userId, sellerDetails } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isSeller) {
            return res.status(400).json({ message: "User is already a seller" });
        }
        const { UserDetails, BusinessDetails, BankDetails } = sellerDetails;
        if (!UserDetails || !BusinessDetails || !BankDetails) {
            return res.status(400).json({ message: "Missing seller details" });
        }
        if (!UserDetails.firstName || UserDetails.firstName.length < 2) {
            return res.status(400).json({ message: "First name should be at least 2 characters" });
        }
        if (!UserDetails.lastName || UserDetails.lastName.length < 2) {
            return res.status(400).json({ message: "Last name should be at least 2 characters" });
        }
        if (!UserDetails.mobile || UserDetails.mobile.length !== 10) {
            return res.status(400).json({ message: "Mobile number must be 10 digits" });
        }
        if (!emailRegex.test(UserDetails.email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (UserDetails.alternativeEmail && !emailRegex.test(UserDetails.alternativeEmail)) {
            return res.status(400).json({ message: "Invalid alternative email format" });
        }
        if (!UserDetails.AddressLine1 || UserDetails.AddressLine1.length < 5) {
            return res.status(400).json({ message: "Address Line 1 should be at least 5 characters" });
        }
        if (!UserDetails.City || UserDetails.City.length < 3) {
            return res.status(400).json({ message: "City should be at least 3 characters" });
        }
        if (!UserDetails.ZipCode || UserDetails.ZipCode.length !== 6) {
            return res.status(400).json({ message: "Zip code must be 6 digits" });
        }
        if (!BusinessDetails.BusinessName || BusinessDetails.BusinessName.length < 3) {
            return res.status(400).json({ message: "Business name should be at least 3 characters" });
        }
        if (!BusinessDetails.gstno || BusinessDetails.gstno.length !== 15) {
            return res.status(400).json({ message: "GST number must be 15 characters" });
        }
        if (!BusinessDetails.BusinessType || BusinessDetails.BusinessType.length < 3) {
            return res.status(400).json({ message: "Business type should be at least 3 characters" });
        }
        if (!BusinessDetails.panoraadhar || BusinessDetails.panoraadhar.length < 10) {
            return res.status(400).json({ message: "PAN or Aadhar must be at least 10 characters" });
        }
        if (!BankDetails.BankName || BankDetails.BankName.length < 3) {
            return res.status(400).json({ message: "Bank name should be at least 3 characters" });
        }
        if (!BankDetails.AccountHolderName || BankDetails.AccountHolderName.length < 3) {
            return res.status(400).json({ message: "Account holder name should be at least 3 characters" });
        }
        if (!ifscRegex.test(BankDetails.ifsccode)) {
            return res.status(400).json({ message: "Invalid IFSC code format" });
        }
        if (!accountNumberRegex.test(BankDetails.accountNumber)) {
            return res.status(400).json({ message: "Account number should be between 9 to 18 digits" });
        }
        if (BankDetails.cvv && (BankDetails.cvv.length !== 3 && BankDetails.cvv.length !== 4)) {
            return res.status(400).json({ message: "CVV must be 3 or 4 digits" });
        }
        if (!BankDetails.expirydate) {
            return res.status(400).json({ message: "Expiry date is required" });
        }
        const newSeller = new Seller({
            UserDetails: {
                firstName: UserDetails.firstName || user.FirstName,
                lastName: UserDetails.lastName || user.LastName,
                mobile: UserDetails.mobile || user.MobileNum,
                email: UserDetails.email || user.email,
                alternativeEmail: UserDetails.alternativeEmail,
                AddressLine1: UserDetails.AddressLine1,
                AddressLine2: UserDetails.AddressLine2,
                locality: UserDetails.locality,
                City: UserDetails.City,
                ZipCode: UserDetails.ZipCode
            },
            BusinessDetails: {
                BusinessName: BusinessDetails.BusinessName,
                gstno: BusinessDetails.gstno,
                BusinessType: BusinessDetails.BusinessType,
                panoraadhar: BusinessDetails.panoraadhar,
                BusinessNumber: BusinessDetails.BusinessNumber,
                BusinessAddressLine1: BusinessDetails.BusinessAddressLine1,
                BusinessAddressLine2: BusinessDetails.BusinessAddressLine2,
                Businesslocality: BusinessDetails.Businesslocality,
                BusinessCity: BusinessDetails.BusinessCity,
                BusinessZipCode: BusinessDetails.BusinessZipCode
            },
            BankDetails: {
                BankName: BankDetails.BankName,
                AccountHolderName: BankDetails.AccountHolderName,
                ifsccode: BankDetails.ifsccode,
                Banklocality: BankDetails.Banklocality,
                accountNumber: BankDetails.accountNumber,
                cvv: BankDetails.cvv,
                expirydate: BankDetails.expirydate
            }
        });
        const savedSeller = await newSeller.save();
        user.isSeller = true;
        user.sellerId = savedSeller._id;
        await user.save();

        return res.status(201).json({ message: "Seller created successfully", seller: savedSeller });
    } catch (error) {
        console.error("Error creating seller:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

export const deleteSeller = async (req, res) => {
    const { sellerId, userId } = req.params;

    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        await Seller.findByIdAndDelete(sellerId);
        const user = await User.findById(userId);
        if (user) {
            user.isSeller = false;
            user.sellerId = null;  
            await user.save();
        }
        return res.status(200).json({ message: "Seller deleted successfully, User updated" });
    } catch (error) {
        console.error("Error deleting seller:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

export const sellerDetails = async (req, res) => {
    try {
        let seller = await Seller.find({});
        res.send({status: "ok", data: seller});
    } catch (error) {
        console.error("Error deleting seller:", error);
        return res.status(500).json({ message: "Server error", error });
    }
}
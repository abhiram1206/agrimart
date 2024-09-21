// authControllers.js
import bcrypt from 'bcrypt';
import AdminUserModel from '../models/AdminUserModel.js';
import jwt from 'jsonwebtoken';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    return {
        _id: user._id,
        access_token,
        AdminName: user.AdminName,
        AdminEmail: user.AdminEmail,
        profile_img: user.profile_img
    };
};

export const SignUp = async (req, res) => {
    const { AdminName, AdminEmail, password } = req.body;

    if (!AdminName || !AdminEmail || !password) {
        return res.status(400).json({ error: "Request body is missing required fields" });
    }

    if (!emailRegex.test(AdminEmail)) {
        return res.status(403).json({ error: "Email is invalid" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ error: "Password is invalid" });
    }

    try {
        const hashed_password = await bcrypt.hash(password, 10);

        let user = new AdminUserModel({
            AdminName,
            AdminEmail,
            password: hashed_password,
        });

        const savedUser = await user.save();
        return res.status(200).json(formatDatatoSend(savedUser))
    } catch (err) {
        if (err.code === 11000) {
            return res.status(500).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message })
    }
};

export const Login = async (req, res) => {
    const { AdminEmail, password } = req.body;

    if (!AdminEmail || !password) {
        return res.status(400).json({ error: "Request body is missing required fields" })
    }

    try {
        const user = await AdminUserModel.findOne({ AdminEmail })
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        return res.status(200).json(formatDatatoSend(user));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

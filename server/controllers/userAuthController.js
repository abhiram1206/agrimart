import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import 'dotenv/config'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const signupUser = async (req, res) => {
  const { FirstName, LastName, email, MobileNum, City, password } = req.body;

  if (!email.match(emailRegex)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  }

  if (!password.match(passwordRegex)) {
    return res.status(400).json({
      success: false,
      error: 'Password must be 6-20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter',
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      FirstName,
      LastName,
      email,
      MobileNum,
      City,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { signupUser, loginUser };

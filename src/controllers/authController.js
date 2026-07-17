import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            throw new AppError('Email already registered', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({
            message: 'User registered',
            user: {
                name, 
                email
            }
        });
    }
    catch(error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            throw new AppError('Invalid email or password', 400);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch) {
            throw new AppError('Invalid email or password', 400);
        }

        if(existingUser.email === process.env.ADMIN_EMAIL && existingUser.role !== "admin") {
            existingUser.role = "admin";
            await existingUser.save();
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token
        });
    }
    catch(error) {
        next(error);
    }
};

export { register, login };
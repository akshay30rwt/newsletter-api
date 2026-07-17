import User from '../models/User.js';
import Subscriber from '../models/Subscriber.js';
import AppError from '../utils/AppError.js';

const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            throw new AppError('Register to subscribe', 403);
        }

        const subscriber = new Subscriber({ email });
        await subscriber.save();

        return res.status(201).json({
            message: 'Subscribed',
            subscribedAt: subscriber.subscribedAt
        });
    }
    catch(error) {
        next(error);
    }
};

const unsubscribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        const subscriber = await Subscriber.findOneAndDelete({ email });

        if(!subscriber) {
            throw new AppError('You were not a subscriber', 403);
        }

        return res.status(200).json({
            message: 'Unsubscribed',
            email: subscriber.email
        });
    }
    catch(error) {
        next(error);
    }
};

export { subscribe, unsubscribe };
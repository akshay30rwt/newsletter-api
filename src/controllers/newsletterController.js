import Newsletter from '../models/Newsletter.js';
import Subscriber from '../models/Subscriber.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';

const createNewsletter = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const newsletter = new Newsletter({ title, content, createdBy: req.user.useId });
        await newsletter.save();

        return res.status(201).json({
            message: 'Newsletter created',
            title: newsletter.title
        });
    }
    catch(error) {
        next(error);
    }
};

const sendNewsletter = async (req, res, next) => {
    try {
        const { id } = req.params;

        const subscriber = await Subscriber.findById(id);

        if(!subscriber) {
            throw new AppError('Subscriber not found', 404);
        }

        const { _id } = req.body;

        const newsletter = await Newsletter.findOne({ _id });

        if(!newsletter) {
            throw new AppError(`No news letter with this ID: ${_id}`, 404);
        }

        await sendEmail({
            to: subscriber.email,
            subject: 'Your Newsletter',
            html: `
                <h1>${newsletter.title}</h1>
                <p>${newsletter.content}</p>
            `
        });

        return res.status(200).json({
            message: 'Newsletter sent successfully'
        });
    }
    catch(error) {
        next(error);
    }
};

const getNewsletters = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const newsletters = await Newsletter.find().select('-sentAt -createdBy').skip(skip).limit(limit);

        const totalNewsletters = await Newsletter.countDocuments();

        return res.status(200).json({
            totalNewsletters,
            page,
            totalPages: Math.ceil(totalNewsletters/limit),
            newsletters
        });
    }
    catch(error) {
        next(error);
    }
};

const getSubscribers = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;

        const subscribers = await Subscriber.find().skip(skip).limit(limit);

        const totalSubscribers = await Subscriber.countDocuments();

        return res.status(200).json({
            totalSubscribers,
            page,
            totalPages: Math.ceil(totalNewsletters/limit),
            subscribers
        });
    }
    catch(error) {
        next(error);
    }
};

export { createNewsletter, sendNewsletter, getNewsletters, getSubscribers };
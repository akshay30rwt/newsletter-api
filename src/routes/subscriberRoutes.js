import express from 'express';
import { subscribe, unsubscribe } from '../controllers/subscriberController.js';
import { subscriberSchema } from '../validators/subscriberValidator.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post('/subscribe', validate(subscriberSchema), subscribe);
router.post('/unsubscribe', validate(subscriberSchema), unsubscribe);

export default router;
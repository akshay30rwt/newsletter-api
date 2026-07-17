import express from 'express';
import { subscribe, unsubscribe } from '../controllers/subscriberController.js';
import { subscriberSchema } from '../validators/subscriberValidator.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.post('/', validate(subscriberSchema), subscribe);
router.post('/', validate(subscriberSchema), unsubscribe);

export default router;
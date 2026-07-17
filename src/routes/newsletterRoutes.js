import express from 'express';
import { protect, adminOnly} from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';
import { newsletterSchema } from '../validators/newsletterValidator.js';
import { createNewsletter, sendNewsletter, getNewsletters, getSubscribers } from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/newsletters', protect, adminOnly, validate(newsletterSchema), createNewsletter);
router.post('/:id/send', protect, adminOnly, sendNewsletter);
router.get('/', protect, adminOnly, getSubscribers);
router.get('/newsletters', protect, getNewsletters);

export default router;
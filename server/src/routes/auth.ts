import express from 'express';
import { signupLimiter, loginLimiter } from '../middleware/rateLimiter';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../validators/auth';

const router = express.Router();

router.post('/register', registerValidation, signupLimiter, register);
router.post('/login', loginValidation, loginLimiter, login);

export default router;

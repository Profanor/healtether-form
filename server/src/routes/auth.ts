import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../validators/auth';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;

import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validationCredential = [
  body('username').trim().notEmpty().withMessage('username least 5 characters'),
  body('password').trim().isLength({ min: 5 }).withMessage('password least 5 characters'),
];

router.post('/login', validationCredential, authController.login);
router.get('/me', isAuth, authController.me);

export default router;

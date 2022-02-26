import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validationCredential = [
  body('username').trim().notEmpty().withMessage('username least 5 characters'),
  body('password').trim().isLength({ min: 5 }).withMessage('password least 5 characters'),
];

const validateSignup = [
  ...validationCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid URL').optional({ nullable: true, checkFalsy: true }),
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validationCredential, authController.login);
router.get('/me', authController.me);

export default router;

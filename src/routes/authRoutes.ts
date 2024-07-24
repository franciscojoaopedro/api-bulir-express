import { Router } from 'express';
import {  login } from '../controllers/authController';

const auth_router = Router();

auth_router.post('/login', login);

export default auth_router;

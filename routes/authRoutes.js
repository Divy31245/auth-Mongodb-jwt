import express from 'express';

import { loginController } from '../controllers/login.js';
import { regController } from '../controllers/register.js';


const router = express.Router();

router.post("/login",loginController);
router.post("/register",regController);

export default router;
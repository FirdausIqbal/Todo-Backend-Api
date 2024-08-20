import express from 'express';
import authControll from '../controllers/authControll.js';
const router = express.Router();

router.post('/register', authControll.registerUser);
router.post('/login', authControll.loginUser);
router.post('/logout', authControll.logoutUser);
router.get('/cekauth', authControll.cekAuth);

export default router;
import express from 'express';
import multer from 'multer';
import { matchCV } from '../controllers/mlController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public endpoint: forward CV to Python ML service
router.post('/match', upload.single('cvFile'), matchCV);

export default router;

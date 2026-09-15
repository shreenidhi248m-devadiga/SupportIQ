"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = (0, express_1.Router)();
// Public / Demo AI endpoints
router.post('/analyze', aiController_1.analyzeText);
router.post('/analyze-text', aiController_1.analyzeText);
router.post('/analyze-voice', uploadMiddleware_1.upload.single('attachment'), aiController_1.analyzeVoice);
router.post('/analyze-image', uploadMiddleware_1.upload.single('attachment'), aiController_1.analyzeImage);
router.post('/analyze-document', uploadMiddleware_1.upload.single('attachment'), aiController_1.analyzeDocument);
// Protected ticket AI analysis details
router.get('/ticket/:ticketId', authMiddleware_1.authenticateToken, aiController_1.getTicketAIAnalysis);
exports.default = router;

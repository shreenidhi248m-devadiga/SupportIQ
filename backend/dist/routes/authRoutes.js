"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Public Authentication Endpoints
router.post('/register', authController_1.registerCustomer);
router.post('/login', authController_1.loginCustomer);
router.post('/admin-login', authController_1.loginAdmin);
router.post('/forgot-password', authController_1.forgotPassword);
router.post('/reset-password', authController_1.resetPassword);
router.post('/verify-email', authController_1.verifyEmail);
exports.default = router;

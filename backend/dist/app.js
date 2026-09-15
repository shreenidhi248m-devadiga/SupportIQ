"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Import Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGIN, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve Uploaded Files Statically
app.use('/uploads', express_1.default.static(path_1.default.resolve(process.cwd(), env_1.env.UPLOAD_PATH)));
// API Health Check
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'SupportIQ Backend API',
        timestamp: new Date().toISOString(),
    });
});
// Register API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/tickets', ticketRoutes_1.default);
app.use('/api/messages', messageRoutes_1.default);
app.use('/api/ai', aiRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
// Error Handling Middlewares
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;

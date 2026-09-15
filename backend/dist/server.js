"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const logger_1 = require("./utils/logger");
const startServer = async () => {
    // Connect to MongoDB
    await (0, database_1.connectDatabase)();
    const PORT = env_1.env.PORT;
    app_1.default.listen(PORT, () => {
        logger_1.logger.info(`=======================================================`);
        logger_1.logger.info(`🚀 SupportIQ Backend API running on port ${PORT}`);
        logger_1.logger.info(`🌐 Environment: ${env_1.env.NODE_ENV}`);
        logger_1.logger.info(`🔗 Base URL: http://localhost:${PORT}/api`);
        logger_1.logger.info(`=======================================================`);
    });
};
startServer();

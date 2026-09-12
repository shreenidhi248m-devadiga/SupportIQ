import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';

const startServer = async () => {
  // Connect to MongoDB
  await connectDatabase();

  const PORT = env.PORT;
  app.listen(PORT, () => {
    logger.info(`=======================================================`);
    logger.info(`🚀 SupportIQ Backend API running on port ${PORT}`);
    logger.info(`🌐 Environment: ${env.NODE_ENV}`);
    logger.info(`🔗 Base URL: http://localhost:${PORT}/api`);
    logger.info(`=======================================================`);
  });
};

startServer();

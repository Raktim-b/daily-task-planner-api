require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/dbCon");

const logger = require("./src/utils/logger");
const router = require("./src/routes");

require("./src/model");

const app = express();

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Check database connection
    await sequelize.authenticate();
    logger.info("Database connected");

    // Sync all models
    await sequelize.sync({ alter: true });
    logger.info("Database synced");

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
  }
};

startServer();

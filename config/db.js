const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Create Sequelize instance and connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",  // Use MySQL
    logging: false,    // Disable SQL query logging (optional)
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

module.exports = sequelize;

const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware"); // Import middleware

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files like CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Sync the models with the database
sequelize.sync({ alter: true })  // Use `alter: true` to apply changes without resetting the database
  .then(() => console.log("Database synchronized successfully"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Ensure this is used before authMiddleware
app.use(authMiddleware); // Extracts user from JWT token

// Homepage route
app.get('/', (req, res) => {
  console.log(req.user,"2nd");
  res.render('index', { title: 'TechPortfolio Links' ,user: req.user});
});

// Routes
app.use('/', mainRoutes);
app.use('/', authRoutes);

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
const bodyParser = require('body-parser');

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

// Homepage route
app.get('/', (req, res) => {
  res.render('index', { title: 'TechPortfolio Links' });
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
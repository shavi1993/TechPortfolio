const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true  // Only one unique index on the email column
},
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),   // String type for phone number, max length 15
    allowNull: true,             // Phone number cannot be NULL
    unique: true,                 // Ensure phone number is unique
  },
  referral_code: {
    type: DataTypes.STRING(20),   // String type for referral_code, max length 20
    unique: true,                 // Ensure referral code is unique
  },
  payment_id: {
    type: DataTypes.STRING(50), 
    allowNull: true,           // String type for payment_id, max length 50
  },
  subscription_id: {
    type: DataTypes.STRING(50),   // String type for subscription_id, max length 50
    allowNull: true,         
  },
  otp: {
    type: DataTypes.STRING(15),    // String type for OTP with a maximum length of 6 characters (for numeric OTP)
    allowNull: true,              // OTP is optional (you can set it based on your business logic)
  },
  created_at: {
    type: DataTypes.DATE,         // Date type for created_at
    defaultValue: DataTypes.NOW,  // Set the default value to the current timestamp
  },
  updated_at: {
    type: DataTypes.DATE,         // Date type for updated_at
    defaultValue: DataTypes.NOW,  // Set the default value to the current timestamp
    onUpdate: DataTypes.NOW,      // Update timestamp when the record is modified
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),  // ENUM type for status with three possible values
    defaultValue: 'active',                                  // Default value is 'active'
  },
}, {
  // Model options
  tableName: "users",  // Specify the table name
  timestamps: false,   // Disable automatic creation of createdAt and updatedAt fields
});
// Sync database with the model
User.sync({ force: true })  // Use { alter: true } if you want to update the schema without dropping tables
.then(() => console.log('User table created/updated successfully'))
.catch(err => console.log('Error synchronizing database:', err));

module.exports = User;

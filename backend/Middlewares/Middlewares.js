const express = require("express"),
  app = express();
//   nodemailer = require("nodemailer"),
//   cron = require("node-cron"),
//   PORT = 3000,
//   axios = require("axios"),
//   cors = require("cors"),
//   Email = require("./Schema/SendEmailSchema"), // Email Schema
//   Diary = require("./Schema/DiarySchema"), // Diary Schema
//   user = require("./Schema/userSchema"), // User Schema
//   mongoose = require("mongoose"),
//   bodyParser = require("body-parser"),
//   URL = process.env.MONGO_URL;

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Use cookieParser
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found. User must log in.");
    return res.status(500).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  try {
    const decoded = jwt.verify(token, "viviviviv");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { submitInquiry } = require("../controllers/inquiry.controller");

const router = express.Router();

// ── Rate limiter: max 5 submissions per IP per 15 minutes
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many submissions from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Validation rules
const inquiryValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage("Email is too long"),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[\d\s\-()]{7,20}$/).withMessage("Please enter a valid phone number")
    .escape(),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 10, max: 2000 }).withMessage("Message must be between 10 and 2000 characters")
    .escape(),
];

// POST /api/inquiry
router.post("/inquiry", inquiryLimiter, inquiryValidation, submitInquiry);

module.exports = router;

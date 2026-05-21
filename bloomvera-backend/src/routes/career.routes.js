const express   = require("express");
const { body }  = require("express-validator");
const rateLimit = require("express-rate-limit");
const multer    = require("multer");
const { submitCareer } = require("../controllers/career.controller");

const router = express.Router();

// ── Rate limiter: 5 applications per IP per 15 min
const careerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many applications from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders:   false,
});

// ── Multer — memory storage (no disk writes, safe for Resend attachments)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed."));
    }
  },
});

// ── Validation
const careerValidation = [
  body("fullName")
    .trim().notEmpty().withMessage("Full name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters")
    .escape(),

  body("email")
    .trim().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email")
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage("Email is too long"),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[\d\s\-()+]{7,20}$/).withMessage("Enter a valid phone number")
    .escape(),

  body("position")
    .trim().notEmpty().withMessage("Position is required")
    .isLength({ max: 200 }).withMessage("Position name is too long")
    .escape(),

  body("message")
    .trim().notEmpty().withMessage("Cover letter / message is required")
    .isLength({ min: 20, max: 3000 }).withMessage("Message must be 20–3000 characters")
    .escape(),
];

// POST /api/career
// upload.single("resume") handles the file; careerValidation handles text fields
router.post(
  "/career",
  careerLimiter,
  upload.single("resume"),
  careerValidation,
  submitCareer
);

module.exports = router;
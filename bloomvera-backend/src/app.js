const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");

const inquiryRoutes = require("./routes/inquiry.routes");
const careerRoutes  = require("./routes/career.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// ── Security headers
app.use(helmet());

// ── CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://bloomveraautism.com",
  "https://bloomveraautism.com",
  "https://www.bloomveraautism.com",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      return callback(new Error("CORS: Missing origin in production"));
    }
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods:        ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials:    true,
}));

// ── Body parsers (JSON + URL-encoded for non-file routes)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Logger
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// ── Root
app.get("/", (_req, res) => res.json({
  success: true,
  message: "🌸 Bloomvera Autism API is running",
  version: "1.0.0",
  environment: process.env.NODE_ENV || "development",
}));

// ── Health
app.get("/health", (_req, res) => res.json({
  status: "ok",
  service: "Bloomvera Autism API",
  timestamp: new Date().toISOString(),
}));

// ── Routes
app.use("/api", inquiryRoutes);   // POST /api/inquiry
app.use("/api", careerRoutes);    // POST /api/career

// ── Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
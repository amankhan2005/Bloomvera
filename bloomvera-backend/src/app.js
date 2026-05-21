const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const inquiryRoutes = require("./routes/inquiry.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

// ── Security headers
app.use(helmet());

// ── CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://bloomveraautism.com",
  "https://www.bloomveraautism.com",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman) in dev only
      if (!origin) {
        if (process.env.NODE_ENV !== "production") return callback(null, true);
        return callback(new Error("CORS: Missing origin in production"));
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Logger (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ── Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Bloomvera Autism API",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes
app.use("/api", inquiryRoutes);

// ── 404 + Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
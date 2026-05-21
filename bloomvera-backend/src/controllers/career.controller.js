const { validationResult } = require("express-validator");
const { sendCareerAdminEmail, sendCareerConfirmationEmail } = require("../utils/email.service");

async function submitCareer(req, res) {
  // 1. Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Please fix the errors below.",
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }

  const { fullName, email, phone, position, message } = req.body;
  const resumeFile = req.file || null; // multer puts single file here

  try {
    const [adminResult, userResult] = await Promise.allSettled([
      sendCareerAdminEmail({ fullName, email, phone: phone || null, position, message, resumeFile }),
      sendCareerConfirmationEmail({ fullName, email, position }),
    ]);

    if (adminResult.status === "rejected") {
      console.error("[CAREER] Admin email failed:", adminResult.reason?.message);
    }
    if (userResult.status === "rejected") {
      console.error("[CAREER] Applicant confirmation failed:", userResult.reason?.message);
    }

    // If admin email failed, return error
    if (adminResult.status === "rejected") {
      return res.status(500).json({
        success: false,
        message: "Failed to submit your application. Please try again or email us at info@bloomveraautism.com.",
      });
    }

    console.log(`[CAREER] New application from ${fullName} <${email}> for: ${position}`);
    return res.status(200).json({
      success: true,
      message: "Application submitted! Our team will review and respond within 3–5 business days.",
    });

  } catch (error) {
    console.error("[CAREER] Unexpected error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

module.exports = { submitCareer };
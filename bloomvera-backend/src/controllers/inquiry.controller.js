const { validationResult } = require("express-validator");
const { sendAdminEmail, sendUserConfirmationEmail } = require("../utils/email.service");

async function submitInquiry(req, res) {
  // 1. Check validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Please fix the errors below.",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  const { name, email, phone, message } = req.body;

  try {
    // 2. Send both emails — admin notification + user confirmation
    const [adminResult, userResult] = await Promise.allSettled([
      sendAdminEmail({ name, email, phone: phone || null, message }),
      sendUserConfirmationEmail({ name, email }),
    ]);

    // 3. Log failures server-side (never expose Resend errors to client)
    if (adminResult.status === "rejected") {
      console.error("[EMAIL] Admin email failed:", adminResult.reason?.message);
    }
    if (userResult.status === "rejected") {
      console.error("[EMAIL] User confirmation failed:", userResult.reason?.message);
    }

    // 4. If admin email failed entirely — return error
    if (adminResult.status === "rejected") {
      return res.status(500).json({
        success: false,
        message: "Failed to send your message. Please try again or call us directly at (123) 456-7890.",
      });
    }

    // 5. Success
    console.log(`[INQUIRY] New inquiry from ${name} <${email}>`);
    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received. We'll be in touch within one business day.",
    });

  } catch (error) {
    console.error("[INQUIRY] Unexpected error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

module.exports = { submitInquiry };

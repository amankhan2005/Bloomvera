const { Resend } = require("resend");

// Initialize lazily so missing API key doesn't crash on import
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in your .env file");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function getFrom() {
  const name = process.env.FROM_NAME || "Bloomvera Autism";
  const email = process.env.FROM_EMAIL || "noreply@bloomveraautism.com";
  return `${name} <${email}>`;
}

// ─────────────────────────────────────────
// ADMIN NOTIFICATION EMAIL
// ─────────────────────────────────────────
async function sendAdminEmail({ name, email, phone, message }) {
  const resend = getResend();
  const FROM = getFrom();
  const ADMIN = process.env.ADMIN_EMAIL;

  if (!ADMIN) throw new Error("ADMIN_EMAIL is not set in your .env file");

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Inquiry — Bloomvera Autism</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#FF7A00 0%,#E91E63 100%);padding:28px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.8);">New Website Inquiry</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff;">Bloomvera Autism</h1>
          </td>
        </tr>

        <!-- Alert -->
        <tr>
          <td style="background:#FFF5EB;border-left:4px solid #FF7A00;padding:14px 32px;">
            <p style="margin:0;font-size:13px;color:#CC6200;font-weight:600;">
              🔔 A new inquiry was submitted via the contact form.
            </p>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 20px;font-size:16px;font-weight:700;color:#111827;">Contact Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;">👤 Full Name</p>
                <p style="margin:4px 0 0;font-size:14px;color:#111827;font-weight:600;">${name}</p>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;">📧 Email</p>
                <p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${email}" style="color:#FF7A00;text-decoration:none;">${email}</a></p>
              </td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;">📞 Phone</p>
                <p style="margin:4px 0 0;font-size:14px;color:#111827;">${phone || '<span style="color:#9CA3AF;">Not provided</span>'}</p>
              </td></tr>
              <tr><td style="padding:10px 0;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;">🕐 Submitted</p>
                <p style="margin:4px 0 0;font-size:14px;color:#111827;">${submittedAt}</p>
              </td></tr>
            </table>

            <!-- Message -->
            <div style="margin-top:24px;">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;">💬 Message</p>
              <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:16px;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;white-space:pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Reply button -->
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${email}?subject=Re: Your Bloomvera Autism Inquiry"
                style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#FF7A00,#E91E63);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;">
                Reply to ${name}
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 32px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:11px;color:#9CA3AF;text-align:center;line-height:1.6;">
              Auto-generated by Bloomvera Autism contact form<br/>
              © ${new Date().getFullYear()} Bloomvera Autism. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const result = await resend.emails.send({
    from: FROM,
    to: ADMIN,
    reply_to: email,
    subject: `New Inquiry from ${name} — Bloomvera Autism`,
    html,
  });

  if (result.error) throw new Error(result.error.message);
  return result;
}

// ─────────────────────────────────────────
// USER CONFIRMATION EMAIL
// ─────────────────────────────────────────
async function sendUserConfirmationEmail({ name, email }) {
  const resend = getResend();
  const FROM = getFrom();
  const siteUrl = process.env.FRONTEND_URL || "https://bloomveraautism.com";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message — Bloomvera Autism</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#FF7A00 0%,#E91E63 100%);padding:36px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:36px;">🌸</p>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">Message Received!</h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Thank you for contacting Bloomvera Autism</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px;">
            <p style="margin:0 0 16px;font-size:15px;color:#111827;font-weight:600;">Hi ${name},</p>
            <p style="margin:0 0 16px;font-size:14px;color:#6B7280;line-height:1.75;">
              Thank you for reaching out to us. We've received your message and our team will get back to you shortly.
            </p>
            <p style="margin:0 0 28px;font-size:14px;color:#6B7280;line-height:1.75;">
              We typically respond within <strong style="color:#111827;">one business day</strong>.
            </p>

            <!-- What happens next -->
            <div style="background:#FFF5EB;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#CC6200;text-transform:uppercase;letter-spacing:0.08em;">What Happens Next</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:14px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="vertical-align:top;padding-right:12px;">
                        <div style="width:24px;height:24px;background:#FF7A00;border-radius:50%;text-align:center;line-height:24px;">
                          <span style="font-size:11px;font-weight:700;color:#fff;">1</span>
                        </div>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;font-weight:600;color:#111827;">Our team reviews your message</p>
                        <p style="margin:2px 0 0;font-size:12px;color:#9CA3AF;">Usually within a few hours</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:14px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="vertical-align:top;padding-right:12px;">
                        <div style="width:24px;height:24px;background:#FF7A00;border-radius:50%;text-align:center;line-height:24px;">
                          <span style="font-size:11px;font-weight:700;color:#fff;">2</span>
                        </div>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;font-weight:600;color:#111827;">We reach out personally</p>
                        <p style="margin:2px 0 0;font-size:12px;color:#9CA3AF;">By phone or email — your preference</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="vertical-align:top;padding-right:12px;">
                        <div style="width:24px;height:24px;background:#00A651;border-radius:50%;text-align:center;line-height:24px;">
                          <span style="font-size:11px;font-weight:700;color:#fff;">3</span>
                        </div>
                      </td>
                      <td>
                        <p style="margin:0;font-size:13px;font-weight:600;color:#111827;">Free consultation</p>
                        <p style="margin:2px 0 0;font-size:12px;color:#9CA3AF;">No obligation, just a conversation</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:28px;">
              <a href="${siteUrl}/services"
                style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#FF7A00,#E91E63);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;">
                Explore Our Programs
              </a>
            </div>

            <!-- Phone -->
            <div style="border-top:1px solid #F3F4F6;padding-top:20px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9CA3AF;">Prefer to talk now? Call us:</p>
              <a href="tel:+17744642639" style="font-size:18px;font-weight:700;color:#FF7A00;text-decoration:none;">+1 774-464-2639</a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 32px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:11px;color:#9CA3AF;text-align:center;line-height:1.7;">
              <strong style="color:#374151;">Bloomvera Autism</strong><br/>
              support@bloomveraautism.com &nbsp;·&nbsp; +1 774-464-2639<br/>
              2823 Marietta St, Steilacoom, WA 98388<br/><br/>
              © ${new Date().getFullYear()} Bloomvera Autism. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "We received your message — Bloomvera Autism",
    html,
  });

  if (result.error) throw new Error(result.error.message);
  return result;
}

module.exports = { sendAdminEmail, sendUserConfirmationEmail };
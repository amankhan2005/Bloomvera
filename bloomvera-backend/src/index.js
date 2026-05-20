require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🌸 Bloomvera Autism API`);
  console.log(`─────────────────────────`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL}`);
  console.log(`─────────────────────────\n`);
});

# Bloomvera Autism — Backend API

Node.js + Express + Resend email API

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env

# 3. Fill in your .env values (see below)

# 4. Start development server
npm run dev

# 5. Start production server
npm start
```

---

## Environment Variables

Edit your `.env` file:

```env
PORT=5000
NODE_ENV=development

# Your frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Resend API key — get from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# Where admin emails go (your clinic email)
ADMIN_EMAIL=admin@bloomveraautism.com

# Sender identity
FROM_EMAIL=noreply@bloomveraautism.com
FROM_NAME=Bloomvera Autism
```

---

## API Endpoints

### Health Check
```
GET /health
```
Returns `{ status: "ok" }`

### Submit Inquiry
```
POST /api/inquiry
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(123) 456-7890",   ← optional
  "message": "I'd like to learn more about ABA therapy."
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been received..."
}
```

**Validation Error (422):**
```json
{
  "success": false,
  "message": "Please fix the errors below.",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address" }
  ]
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "message": "Too many submissions from this IP. Please try again after 15 minutes."
}
```

---

## Security Features

- **Helmet** — HTTP security headers
- **CORS** — only allows requests from your frontend URL
- **Rate limiting** — 5 requests per IP per 15 minutes
- **Input validation** — express-validator on all fields
- **Input sanitization** — `.trim()`, `.escape()`, `.normalizeEmail()`
- **Body size limit** — 10kb max request body
- **No sensitive data in responses** — errors are generic in production

---

## Folder Structure

```
src/
├── index.js                    ← Entry point
├── app.js                      ← Express app + middleware
├── routes/
│   └── inquiry.routes.js       ← POST /api/inquiry route
├── controllers/
│   └── inquiry.controller.js   ← Request handler logic
├── middleware/
│   └── error.middleware.js     ← 404 + global error handler
└── utils/
    └── email.service.js        ← Resend email templates
```

---

## Connecting Frontend

In `src/pages/Contact.jsx`, the form already calls:

```js
const res = await fetch(`${process.env.REACT_APP_API_URL}/api/inquiry`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

Set in frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Resend Setup

1. Go to [resend.com](https://resend.com) and create a free account
2. Add and verify your domain (e.g. `bloomveraautism.com`)
3. Create an API key under **API Keys**
4. Set `RESEND_API_KEY` in your `.env`
5. Set `FROM_EMAIL` to an address on your verified domain

---

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Set `FRONTEND_URL` to your live frontend domain
3. Use a process manager like **PM2**:

```bash
npm install -g pm2
pm2 start src/index.js --name bloomvera-api
pm2 save
pm2 startup
```

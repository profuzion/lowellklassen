// Name It Right landing page: static files + one sign-up endpoint.
// Node 18+ (uses the built-in fetch). Run: npm install && npm start
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "7d", extensions: ["html"] }));

// Very small in-memory rate limit: 5 sign-ups per IP per 10 minutes.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.post("/api/subscribe", async (req, res) => {
  const { first_name = "", email = "", website = "" } = req.body || {};

  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (website) return res.json({ ok: true });
  if (rateLimited(req.ip)) return res.status(429).json({ error: "Too many tries from this connection." });
  if (!first_name.trim() || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please add your first name and a valid email." });
  }

  const { KIT_API_KEY, KIT_FORM_ID, KIT_TAG_ID } = process.env;
  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error("KIT_API_KEY or KIT_FORM_ID is missing from .env");
    return res.status(500).json({ error: "Sign-ups aren't connected yet." });
  }

  try {
    // Kit (ConvertKit) v3: add a subscriber to a form, with an optional tag.
    // Subscribing to the form sends that form's incentive email (the worksheet link).
    const body = { api_key: KIT_API_KEY, email: email.trim(), first_name: first_name.trim() };
    if (KIT_TAG_ID) body.tags = [Number(KIT_TAG_ID)];

    const kit = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (!kit.ok) {
      console.error("Kit error", kit.status, await kit.text());
      return res.status(502).json({ error: "I couldn't add you to the list." });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Kit request failed", err);
    return res.status(502).json({ error: "I couldn't reach the email service." });
  }
});

app.listen(PORT, () => console.log(`Name It Right running on http://localhost:${PORT}`));

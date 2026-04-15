// ============================================================
// Floor — Auth Routes (Email + Password)
// Signup: hash password → store in DB
// Login: verify password → return worker profile
// Works locally AND on deployed sites (no external API needed)
// ============================================================
const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const router   = express.Router();
const User     = require("../models/User");
const Worker   = require("../models/Worker");

const JWT_SECRET = process.env.JWT_SECRET || "floor_jwt_secret_2026_insurtech";

// ─── POST /api/auth/signup ────────────────────────────────────
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ error: "Account already exists. Please log in." });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user account
    const user = await new User({ name, email: normalizedEmail, passwordHash }).save();

    // Check if a Worker with this email already exists (e.g. seeded data)
    const existingWorker = await Worker.findOne({ email: normalizedEmail });

    const token = jwt.sign({ userId: user._id, email: normalizedEmail }, JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      success:   true,
      message:   "Account created successfully!",
      token,
      user:      { id: user._id, name, email: normalizedEmail },
      worker:    existingWorker || null,
      isNewUser: !existingWorker,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Account already exists. Please log in." });
    }
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ error: "No account found with this email. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password. Please try again." });
    }

    // Fetch linked worker profile
    const worker = user.workerId
      ? await Worker.findById(user.workerId)
      : await Worker.findOne({ email: normalizedEmail });

    // Link worker to user if found and not already linked
    if (worker && !user.workerId) {
      await User.findByIdAndUpdate(user._id, { workerId: worker._id });
    }

    const token = jwt.sign({ userId: user._id, email: normalizedEmail }, JWT_SECRET, { expiresIn: "30d" });

    res.json({
      success:   true,
      message:   worker ? `Welcome back, ${worker.name}!` : "Welcome back!",
      token,
      user:      { id: user._id, name: user.name, email: normalizedEmail },
      worker:    worker || null,
      isNewUser: !worker,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/auth/me (verify token) ─────────────────────────
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user    = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const worker = user.workerId
      ? await Worker.findById(user.workerId)
      : await Worker.findOne({ email: user.email });

    res.json({ success: true, user, worker });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;

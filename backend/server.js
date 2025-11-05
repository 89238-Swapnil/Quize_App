// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:4200" })); // Allow Angular app
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/quizDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

/* -------------------------------------------------------------------------- */
/* 🧩 USER MODEL + AUTH ROUTES */
/* -------------------------------------------------------------------------- */

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* -------------------------------------------------------------------------- */
/* 🧩 QUIZ MODEL + ROUTES */
/* -------------------------------------------------------------------------- */
const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  options: [String],
  correctAnswer: String,
});
const Question = mongoose.model("Question", questionSchema);

// ✅ Get all questions
app.get("/api/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// ✅ Seed sample questions
app.post("/api/questions/seed", async (req, res) => {
  try {
    await Question.deleteMany();
    const sample = [
      {
        category: "Angular",
        question: "Which company developed Angular?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correctAnswer: "Google",
      },
      {
        category: "Angular",
        question: "What command creates a new Angular project?",
        options: ["ng new", "npm create angular", "npm start", "ng build"],
        correctAnswer: "ng new",
      },
    ];
    await Question.insertMany(sample);
    res.json({ message: "Questions seeded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
// ✅ Root
app.get("/", (req, res) => res.send("🎯 Quiz API running..."));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

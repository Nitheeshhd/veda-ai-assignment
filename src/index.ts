import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { User } from "./models/user";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});


// ==========================
// 👉 CREATE USER (POST)
// ==========================
app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
});


// ==========================
// 👉 GET ALL USERS
// ==========================
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// ==========================
// 👉 GET SINGLE USER
// ==========================
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


// ==========================
// 👉 UPDATE USER
// ==========================
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});


// ==========================
// 👉 DELETE USER
// ==========================
app.delete("/users/:id", async (req, res) => {
  try {
    console.log("DELETE API HIT");

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// Start server
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth
router.post(
  "/register",
  [
    check("email", "Incorrect email.").isEmail(),
    check(
      "password",
      "Incorrect password. Minimum password length is 6 symbols."
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data on registration.",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with such email already exists." });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword, role: "user" });

      await user.save();
      res.status(201).json({ message: "User created." });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong. Please try again.",
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Enter correct email.").normalizeEmail().isEmail(),
    check("password", "Enter correct password.").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data on login.",
        });
      }

      const { email, password, role } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Incorrect password. Please try again." });

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id, role: user.role });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong. Please try again.",
      });
    }
  }
);

module.exports = router;

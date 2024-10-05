const Customer = require("../../models/customer-schema.js");
const express = require("express");
const customerMailOptions = require("../../utils/mailCustomer.js");
const bcrypt = require("bcryptjs");
const transporter = require("../../utils/transporter.js");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    let customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000);

    customer = new Customer({
      email,
      password,
      full_name,
      otp,
      otp_expiry,
    });

    await customer.save();

    transporter.sendMail(
      customerMailOptions(email, otp, full_name),
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email" });
        }
        res.status(200).json({ message: "OTP sent to your email" });
      },
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", err });
  }
});

// POST /api/auth/customer/verify-otp (customer)
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    const current = new Date();
    if (current > customer.otp_expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (customer.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    customer.verified_email = true;
    customer.otp = null;
    customer.otp_expiry = null;
    await customer.save();
    const payload = {
      user: {
        id: customer.id,
        role: "customer",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      //INFO: revert it back after dev to 5h
      { expiresIn: "10 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "OTP verified successfully", token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

// POST /api/auth/customer/login (customer)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!customer.verified_email) {
      return res.status(400).json({ message: "Email not verified" });
    }
    if (!customer.password) {
      return res.status(400).json({ message: "Password not set" });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = {
      user: {
        id: customer.id,
        role: "customer",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      //INFO: revert it back after dev to 5h
      { expiresIn: "10 days" },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: "Logged in successfully", token, customer });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000);

    customer.otp = otp;
    customer.otp_expiry = otp_expiry;
    await customer.save();

    transporter.sendMail(
      customerMailOptions(email, otp, customer.full_name),
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email" });
        }
        res.status(200).json({ message: "OTP sent to your email" });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000);

    customer.otp = otp;
    customer.otp_expiry = otp_expiry;
    await customer.save();

    transporter.sendMail(
      customerMailOptions(email, otp, customer.full_name),
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Error sending email" });
        }
        res
          .status(200)
          .json({ message: "OTP sent to your email to reset password" });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    const current = new Date();
    if (current > customer.otp_expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (customer.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    customer.password = password;
    customer.otp = null;
    customer.otp_expiry = null;
    await customer.save();
    const payload = {
      user: {
        id: customer.id,
        role: "customer",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      //INFO: revert it back after dev to 5h
      { expiresIn: "10 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "Password reset successfully", token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;

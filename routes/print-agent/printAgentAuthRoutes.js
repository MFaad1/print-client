const PrintAgent = require("../../models/print-agent-schema.js");
const Location = require("../../models/locations-schema.js");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const transporter = require("../../utils/transporter");
const agentMailOptions = require("../../utils/mailPrintAgent.js");
const router = express.Router();

// POST /api/auth/print-agent/signup (print-agent)
/**
 *
 * @class
 * @classdesc  PERF: enums for business_type but could change
 */
router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      full_name,
      business_name,
      business_type,
      zip_code,
    } = req.body;
    if (
      !email ||
      !password ||
      !full_name ||
      !business_name ||
      !business_type ||
      !zip_code
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    let printAgent = await PrintAgent.findOne({ email });
    if (printAgent) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Convert state and zip_code to lowercase for consistency
    const lowerCaseZipCode = zip_code.toLowerCase();

    // Check if location exists in the Location schema
    const existingLocation = await Location.findOne({
      zip_code: lowerCaseZipCode,
    });

    if (!existingLocation) {
      return res.status(400).json({ message: "Location not supported" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000); // OTP expires in 5 minutes

    printAgent = new PrintAgent({
      email,
      password,
      full_name,
      business_name,
      business_type,
      otp,
      otp_expiry,
      location: {
        zip_code: lowerCaseZipCode,
      },
      locationRef: existingLocation._id, // Reference the location in the schema
    });

    // Save new PrintAgent
    await printAgent.save();

    // Send OTP email
    transporter.sendMail(agentMailOptions(email, otp, full_name), (error) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", err });
  }
});
// POST /api/auth/customer/verify-otp (customer)
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const printAgent = await PrintAgent.findOne({ email });

    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const current = new Date();
    if (current > printAgent.otp_expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (printAgent.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    printAgent.verified_email = true;
    printAgent.otp = null;
    printAgent.otp_expiry = null;
    await printAgent.save();
    const payload = {
      user: {
        id: printAgent.id,
        role: "printAgent",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      //INFO: revert it back after dev to 5h
      { expiresIn: "10 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "email verified successfully", token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

// POST /api/auth/print-agent/login (print-agent)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const printAgent = await PrintAgent.findOne({ email });
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!printAgent.verified_email) {
      return res.status(400).json({ message: "Email not verified" });
    }
    if (!printAgent.password) {
      return res.status(400).json({ message: "Password not set" });
    }
    const isMatch = await bcrypt.compare(password, printAgent.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = {
      user: {
        id: printAgent.id,
        role: "printAgent",
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
          .json({ message: "Logged in successfully", token, printAgent });
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
    const printAgent = await PrintAgent.findOne({ email });
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000);

    printAgent.otp = otp;
    printAgent.otp_expiry = otp_expiry;
    await printAgent.save();

    transporter.sendMail(
      agentMailOptions(email, otp, printAgent.full_name),
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
    const printAgent = await PrintAgent.findOne({ email });
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const otp_expiry = new Date(Date.now() + 300000);

    printAgent.otp = otp;
    printAgent.otp_expiry = otp_expiry;
    await printAgent.save();

    transporter.sendMail(
      agentMailOptions(email, otp, printAgent.full_name),
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
    const printAgent = await PrintAgent.findOne({ email });
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const current = new Date();
    if (current > printAgent.otp_expiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (printAgent.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    printAgent.password = password;
    printAgent.otp = null;
    printAgent.otp_expiry = null;
    await printAgent.save();
    const payload = {
      user: {
        id: printAgent.id,
        role: "printAgent",
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

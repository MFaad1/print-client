const express = require("express");
const bcrypt = require("bcryptjs");
const PrintJob = require("../models/print-job-schema.js");
const Admin = require("../models/admin-schema");
const mongoose = require("mongoose");
const Location = require("../models/locations-schema.js");
const Customer = require("../models/customer-schema.js");
const PrintAgent = require("../models/print-agent-schema.js");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password not provided" });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      name,
      email,
      password,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      newAdmin,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    if (!admin.password) {
      return res.status(400).json({ message: "Password not set" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const payload = {
      user: {
        id: admin.id,
        role: "admin",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      //INFO: revert it back after dev to 5h
      { expiresIn: "10 days" },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "Logged in successfully",
          token,
          admin,
        });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/customers", verifyToken("admin"), async (_req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      message: "Customers fetched successfully",
      customers,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/customers/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }
    const customer = await Customer.findById(id).populate("cards");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer fetched successfully",
      customer,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

router.delete("/customers/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error("Error deleting customer:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.put("/customers/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }
    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (err) {
    console.error("Error updating customer:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
});
// Get all print agents
router.get("/print-agents", verifyToken("admin"), async (_req, res) => {
  try {
    const printAgents = await PrintAgent.find();
    res.status(200).json({
      message: "Print agents fetched successfully",
      printAgents,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// Get a single print agent
router.get("/print-agents/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid print agent ID" });
    }
    const printAgent = await PrintAgent.findById(id).populate("cards");
    if (!printAgent) {
      return res.status(404).json({ message: "Print agent not found" });
    }
    res.status(200).json({
      message: "Print agent fetched successfully",
      printAgent,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// delete a print agent
router.delete("/print-agents/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid print agent ID" });
    }

    const printAgent = await PrintAgent.findByIdAndDelete(id);
    if (!printAgent) {
      return res.status(404).json({ message: "Print agent not found" });
    }
    res.status(200).json({ message: "Print agent deleted successfully" });
  } catch (err) {
    console.error("Error deleting print agent:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.put("/print-agents/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid print agent ID" });
    }
    const printAgent = await PrintAgent.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!printAgent) {
      return res.status(404).json({ message: "Print agent not found" });
    }
    res.status(200).json({
      message: "Print agent updated successfully",
      printAgent,
    });
  } catch (err) {
    console.error("Error updating print agent:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

// add location for print agents verification.
router.post("/locations", verifyToken("admin"), async (req, res) => {
  try {
    const { city, state, zip_code, country } = req.body;
    const lowerCaseCity = city.toLowerCase();
    const lowerCaseState = state.toLowerCase();
    const lowerCaseZipCode = zip_code.toLowerCase();
    const lowerCaseCountry = country.toLowerCase();

    const location = await Location.create({
      city: lowerCaseCity,
      state: lowerCaseState,
      zip_code: lowerCaseZipCode,
      country: lowerCaseCountry,
    });

    res
      .status(201)
      .json({ message: "Location created successfully", location });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

// Get all locations with their associated print agents
router.get("/locations", verifyToken("admin"), async (_req, res) => {
  try {
    const locations = await Location.find();
    res
      .status(200)
      .json({ message: "Locations fetched successfully", locations });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/locations/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }
    const location = await Location.findById(id).populate("printAgents");
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({
      message: "Location fetched successfully",
      location,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

router.delete("/locations/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await PrintAgent.updateMany({ locationRef: id }, { is_available: false });

    await location.deleteOne();

    res.status(200).json({
      message: "Location deleted and associated agents disabled successfully",
    });
  } catch (err) {
    console.error("Error deleting location:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.put("/locations/:id", verifyToken("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }
    const { city, state, zip_code, country } = req.body;

    const location = await Location.findByIdAndUpdate(
      id,
      { city, state, zip_code, country },
      { new: true },
    );

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    await PrintAgent.updateMany(
      { locationRef: id },
      { $set: { is_deactivated: true } },
    );
    res.status(200).json({
      message:
        "Location updated successfully, and associated agents deactivated.",
    });
  } catch (err) {
    console.error(
      "Error updating location and deactivating agents:",
      err.message,
    );
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/print-jobs", verifyToken("admin"), async (_req, res) => {
  try {
    const printJobs = await PrintJob.find()
      .populate("print_agent_id")
      .populate("customer_id");
    res.status(200).json({
      message: "All print jobs fetched successfully",
      printJobs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;

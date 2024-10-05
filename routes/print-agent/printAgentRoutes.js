const express = require("express");
const verifyToken = require("../../middleware/verifyToken.js");
const PrintAgent = require("../../models/print-agent-schema.js");
const Location = require("../../models/locations-schema.js");
const otpGenerator = require("otp-generator");
const mailOptions = require("../../utils/mailOTP.js");
const nodemailer = require("nodemailer");
const Card = require("../../models/card-schema.js");
const validateUpdateCard = require("../../middleware/validateCard.js");
const PrintJob = require("../../models/print-job-schema.js");
const router = express.Router();

router.post("/additional-info", verifyToken("printAgent"), async (req, res) => {
  try {
    const { personal_info, location, personal_phone_number, card } = req.body;

    const printAgent = await PrintAgent.findById(req.user.id);
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }
    printAgent.personal_info = personal_info;
    printAgent.location = location;
    printAgent.personal_phone_number = personal_phone_number;

    if (card) {
      const newCard = new Card({
        ...card,
        user_id: printAgent._id,
        ref_type: "PrintAgent",
      });
      await newCard.save();
      printAgent.cards = [newCard._id];
    }

    await printAgent.save();
    res.status(200).json({ message: "Additional info updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.post("/create-card", verifyToken("printAgent"), async (req, res) => {
  try {
    const { card } = req.body;
    //INFO: req.user.id is the id we get from the token
    const printAgent = await PrintAgent.findById(req.user.id);
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }

    const newCard = new Card({
      ...card,
      user_id: printAgent._id,
      ref_type: "PrintAgent",
    });

    await newCard.save();
    printAgent.cards.push(newCard._id);
    await printAgent.save();

    res
      .status(201)
      .json({ message: "Card created successfully", card: newCard });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/get-cards", verifyToken("printAgent"), async (req, res) => {
  try {
    const printAgent = await PrintAgent.findById(req.user.id).populate("cards");
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!printAgent.cards || printAgent.cards.length === 0) {
      return res.status(404).json({ message: "No cards found for this user" });
    }
    res.status(200).json({
      message: "Cards retrieved successfully",
      cards: printAgent.cards,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/get-card/:cardId", verifyToken("printAgent"), async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const printAgent = await PrintAgent.findById(req.user.id);
    if (!printAgent || !printAgent.cards.includes(cardId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ message: "Card retrieved successfully", card });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

//INFO: allows partial updates
router.delete(
  "/delete-card/:cardId",
  verifyToken("printAgent"),
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const printAgent = await PrintAgent.findById(req.user.id);
      if (!printAgent) {
        return res.status(400).json({ message: "User not found" });
      }

      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!printAgent.cards.includes(cardId)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      await Card.deleteOne({ _id: cardId });
      printAgent.cards = printAgent.cards.filter((id) => id !== cardId);
      await printAgent.save();

      res.status(200).json({ message: "Card deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error", err });
    }
  },
);
//  PUT request to update card
//  INFO: allows partial updates

router.put(
  "/update-card/:cardId",
  verifyToken("printAgent"),
  validateUpdateCard,
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const { bank_name, card_number, expiry_date, phone_number, cvv } =
        req.body;

      const printAgent = await PrintAgent.findById(req.user.id);
      if (!printAgent) {
        return res.status(400).json({ message: "User not found" });
      }

      const cardToUpdate = await Card.findById(cardId);
      if (!cardToUpdate) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!printAgent.cards.includes(cardId)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      cardToUpdate.bank_name = bank_name ?? cardToUpdate.bank_name;
      cardToUpdate.card_number = card_number ?? cardToUpdate.card_number;
      cardToUpdate.expiry_date = expiry_date ?? cardToUpdate.expiry_date;
      cardToUpdate.phone_number = phone_number ?? cardToUpdate.phone_number;
      cardToUpdate.cvv = cvv ?? cardToUpdate.cvv;

      await cardToUpdate.save();

      res.status(200).json({ message: "Card updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error", err });
    }
  },
);

// Add location to print agent and only allow if it exists in the locations collection by getting all the locations in location schema and checking if it matches with any state or zip code
router.post("/add-location", verifyToken("printAgent"), async (req, res) => {
  try {
    const { location } = req.body;
    const printAgent = await PrintAgent.findById(req.user.id);
    if (!printAgent) {
      return res.status(400).json({ message: "User not found" });
    }
    const lowerCaseZipCode = location.zip_code.toLowerCase();

    const existingLocation = await Location.findOne({
      zip_code: lowerCaseZipCode,
    });

    if (!existingLocation) {
      return res.status(400).json({ message: "Location not allowed" });
    }

    printAgent.location = {
      ...location,
      zip_code: lowerCaseZipCode,
    };
    printAgent.locationRef = existingLocation._id;
    await printAgent.save();

    res.status(200).json({
      message: "Location added successfully",
      location: printAgent.location,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error });
  }
});

// should send a mail with an otp which when entered switches the is_available to true and vice versa
router.get("/online-status", verifyToken("printAgent"), async (req, res) => {
  try {
    const printAgent = await PrintAgent.findById(req.user.id);
    if (!printAgent) {
      return res.status(404).json({ message: "User not found" });
    }
    const email = printAgent.email;
    const name = printAgent.full_name;

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });

    printAgent.availability_otp = otp;
    printAgent.availability_otp_expiry = Date.now() + 10 * 60 * 1000;
    await printAgent.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "infosynthseer@gmail.com",
        pass: "kegj ytci koqp dveq",
      },
    });

    transporter.sendMail(mailOptions(email, name, otp), (error) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/status-otp/:otp", verifyToken("printAgent"), async (req, res) => {
  try {
    const { otp } = req.params;
    const printAgent = await PrintAgent.findById(req.user.id);

    if (!printAgent) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      printAgent.availability_otp !== otp ||
      printAgent.availability_otp_expiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    printAgent.is_available = !printAgent.is_available;
    printAgent.availability_otp = undefined;
    printAgent.availability_otp_expiry = undefined;
    await printAgent.save();

    res.status(200).json({ message: "Availability updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/print-jobs", verifyToken("printAgent"), async (req, res) => {
  try {
    console.log(req.user.id);
    const printJobs = await PrintJob.find({ print_agent_id: req.user.id });
    res.status(200).json({
      message: "All print jobs fetched successfully",
      printJobs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;

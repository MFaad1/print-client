const express = require("express");
const Location = require("../../models/locations-schema.js");
const verifyToken = require("../../middleware/verifyToken.js");
const Customer = require("../../models/customer-schema.js");
const Card = require("../../models/card-schema.js");
const validateUpdateCard = require("../../middleware/validateCard.js");
const router = express.Router();

router.post("/create-card", verifyToken("customer"), async (req, res) => {
  try {
    const { card } = req.body;
    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    const newCard = new Card({
      ...card,
      user_id: customer._id,
      ref_type: "Customer",
    });

    await newCard.save();
    customer.cards.push(newCard._id);
    await customer.save();

    res
      .status(201)
      .json({ message: "Card created successfully", card: newCard._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/get-cards", verifyToken("customer"), async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).populate("cards");
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!customer.cards || customer.cards.length === 0) {
      return res.status(404).json({ message: "No cards found for this user" });
    }
    res
      .status(200)
      .json({ message: "Cards retrieved successfully", cards: customer.cards });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", err });
  }
});

router.get("/get-card/:cardId", verifyToken("customer"), async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const customer = await Customer.findById(req.user.id);
    if (!customer || !customer.cards.includes(cardId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ message: "Card retrieved successfully", card });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete(
  "/delete-card/:cardId",
  verifyToken("customer"),
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const customer = await Customer.findById(req.user.id);
      if (!customer) {
        return res.status(400).json({ message: "User not found" });
      }

      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!customer.cards.includes(cardId)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      await Card.deleteOne({ _id: cardId });
      customer.cards = customer.cards.filter((id) => id !== cardId);
      await customer.save();

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
  verifyToken("customer"),
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const { bank_name, card_number, expiry_date, phone_number } = req.body;

      const customer = await Customer.findById(req.user.id);
      if (!customer) {
        return res.status(400).json({ message: "User not found" });
      }

      const cardToUpdate = await Card.findById(cardId);
      if (!cardToUpdate) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!customer.cards.includes(cardId)) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      if (bank_name !== undefined) {
        cardToUpdate.bank_name = bank_name;
      }
      if (card_number !== undefined) {
        cardToUpdate.card_number = card_number;
      }
      if (expiry_date !== undefined) {
        cardToUpdate.expiry_date = expiry_date;
      }
      if (phone_number !== undefined) {
        cardToUpdate.phone_number = phone_number;
      }

      await cardToUpdate.save();

      res.status(200).json({ message: "Card updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error", err });
    }
  },
);

router.put(
  "/update-card/:cardId",
  verifyToken("customer"),
  validateUpdateCard,
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const { bank_name, card_number, expiry_date, phone_number, cvv } =
        req.body;

      const customer = await Customer.findById(req.user.id);
      if (!customer) {
        return res.status(400).json({ message: "User not found" });
      }

      const cardToUpdate = await Card.findById(cardId);
      if (!cardToUpdate) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!customer.cards.includes(cardId)) {
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

router.post("/add-location", verifyToken("customer"), async (req, res) => {
  try {
    const { location } = req.body;
    const customer = await Customer.findById(req.user.id);
    if (!customer) {
      return res.status(400).json({ message: "User not found" });
    }
    const lowerCaseState = location.state.toLowerCase();
    const lowerCaseZipCode = location.zip_code.toLowerCase();

    const existingLocation = await Location.findOne({
      zip_code: lowerCaseZipCode,
      state: lowerCaseState,
    });

    if (!existingLocation) {
      return res.status(400).json({ message: "Location not allowed" });
    }

    customer.location = {
      ...location,
      state: lowerCaseState,
      zip_code: lowerCaseZipCode,
    };
    customer.locationRef = existingLocation._id;
    await customer.save();

    res.status(200).json({
      message: "Location added successfully",
      location: customer.location,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get(
  "/available-print-agents",
  verifyToken("customer"),
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.user.id);
      if (!customer) {
        return res.status(400).json({ message: "User not found" });
      }

      const locations = await Location.find({
        zip_code: customer.location.zip_code,
        state: customer.location.state,
      }).populate("printAgents");
      const printAgents = locations.map((location) => {
        return location.printAgents;
      });

      const availablePrintAgents = printAgents.filter((agents) => {
        return agents.some((agent) => agent.is_available);
      });
      res.status(200).json({
        message: "Locations retrieved successfully",
        availablePrintAgents,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error", err });
    }
  },
);

module.exports = router;

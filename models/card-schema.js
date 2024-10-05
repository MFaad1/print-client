const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  ref_type: { type: String, enum: ["Customer", "PrintAgent"], required: true },
  bank_name: { type: String, required: true },
  cvv: { type: String, required: true, minlength: 3 },
  card_number: {
    type: String,
    required: true,
    unique: true,
  },
  expiry_date: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: /^\+[0-9]{2,3}\d{9,10}$/,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Pre-save hook to update the 'updated_at' field
cardSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
    country: { type: String },
  },
  locationRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  otp: { type: String },
  otp_expiry: { type: Date },
  verified_email: { type: Boolean, default: false },
  phone_number: { type: String, match: /^\+[0-9]{2,3}\d{9,10}$/ },
  created_at: { type: Date, default: Date.now },
  stripe_customer_id: { type: String },
  updated_at: { type: Date, default: Date.now },
});

// Middleware to hash the password if modified
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (err) {
    next(err);
  }
});
customerSchema.virtual("jobs", {
  ref: "PrintJob", // The model to use
  localField: "_id", // Find jobs where `localField`
  foreignField: "customer_id", // is equal to `foreignField`
});

customerSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.otp;
    delete ret.otp_expiry;
    return ret;
  },
  virtuals: true,
});
customerSchema.set("toObject", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.otp;
    delete ret.otp_expiry;
    return ret;
  },
  virtuals: true,
});

// Middleware to update the updated_at field
customerSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

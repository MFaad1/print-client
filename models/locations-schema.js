const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: { type: String },
  state: { type: String },
  zip_code: { type: String },
  country: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

locationSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

locationSchema.virtual("printAgents", {
  ref: "PrintAgent",
  localField: "_id",
  foreignField: "locationRef",
});

locationSchema.set("toJSON", { virtuals: true });
locationSchema.set("toObject", { virtuals: true });

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;

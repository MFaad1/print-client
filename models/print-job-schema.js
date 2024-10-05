const mongoose = require("mongoose");

const printJobSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  print_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: "PrintAgent" },
  file_path: { type: String, required: true },
  print_job_title: { type: String, required: true },
  confirmation_code: { type: String },
  print_job_description: { type: String, required: true },
  pages: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  payment_status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  total_cost: { type: Number, required: true },
});

// Pre-save hook to update the 'updated_at' field
printJobSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const PrintJob = mongoose.model("PrintJob", printJobSchema);

module.exports = PrintJob;

const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  transactionId: {
    type: String,
    default: "NA",
    unique: true,
  },
  paymentMethod: {
    type: String,
    
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["credited", "debited"],
    default: "credited",
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Fees = mongoose.model("Fees", feesSchema);

module.exports = Fees;

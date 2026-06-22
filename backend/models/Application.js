const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Internship', 'Inplant']
  },
  duration: {
    type: String,
    required: true
  },
  studentIdCard: {
    type: String,
    required: true
  },
  paymentProof: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: "Pending"
  },
  certificateId: String,
  issuedDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.models.Application || mongoose.model("Application", applicationSchema);

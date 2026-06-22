const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  pdfPath: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

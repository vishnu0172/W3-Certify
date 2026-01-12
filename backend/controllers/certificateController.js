const Certificate = require("../models/Certificate");
const Application = require("../models/Application");

exports.getCertificateByApplicationId = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      applicationId: req.params.applicationId 
    }).populate('applicationId');

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching certificate", error: error.message });
  }
};

exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    const application = await Application.findOne({ certificateId });
    
    if (!application || application.status !== "Approved") {
      return res.status(404).json({ message: "Certificate not found or invalid" });
    }

    const certificate = await Certificate.findOne({ certificateId });
    
    res.json({
      valid: true,
      certificate: {
        certificateId: application.certificateId,
        name: application.name,
        collegeName: application.collegeName,
        type: application.type,
        duration: application.duration,
        issuedDate: application.issuedDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying certificate", error: error.message });
  }
};

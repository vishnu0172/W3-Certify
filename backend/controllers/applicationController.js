const Application = require("../models/Application");
const Certificate = require("../models/Certificate");
const generateCertificate = require("../utils/generateCertificate");

exports.apply = async (req, res) => {
  try {
    const { name, collegeName, rollNo, type, duration } = req.body;
    
    const studentIdCard = req.files?.studentIdCard?.[0]?.path;
    const paymentProof = req.files?.paymentProof?.[0]?.path;

    if (!studentIdCard || !paymentProof) {
      return res.status(400).json({ message: "Please upload both student ID card and payment proof" });
    }

    const app = await Application.create({
      userId: req.user.id,
      name,
      collegeName,
      rollNo,
      type,
      duration,
      studentIdCard,
      paymentProof,
      status: "Pending"
    });

    res.status(201).json({ message: "Application submitted successfully", application: app });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const apps = await Application.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let updateData = { status };

    if (status === "Approved") {
      const certId = "W3CERT-" + Date.now();
      updateData.certificateId = certId;
      updateData.issuedDate = new Date();
    }

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Generate certificate PDF if approved
    if (status === "Approved") {
      const pdfPath = await generateCertificate({
        name: app.name,
        collegeName: app.collegeName,
        rollNo: app.rollNo,
        type: app.type,
        duration: app.duration,
        certificateId: app.certificateId,
        issuedDate: app.issuedDate
      });

      // Save certificate to database
      await Certificate.create({
        applicationId: app._id,
        certificateId: app.certificateId,
        pdfPath
      });
    }

    res.json({ 
      message: `Application ${status.toLowerCase()} successfully`, 
      application: app 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating application status", error: error.message });
  }
};

exports.downloadCertificate = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if user owns this application or is admin
    if (app.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (app.status !== "Approved") {
      return res.status(400).json({ message: "Certificate not available. Application not approved yet." });
    }

    const certificate = await Certificate.findOne({ applicationId: app._id });
    
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.download(certificate.pdfPath);
  } catch (error) {
    res.status(500).json({ message: "Error downloading certificate", error: error.message });
  }
};

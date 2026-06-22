import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    rollNo: "",
    type: "Internship",
    duration: ""
  });
  const [files, setFiles] = useState({
    studentIdCard: null,
    paymentProof: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!files.studentIdCard || !files.paymentProof) {
      setError("Please upload both Student ID Card and Payment Proof");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("studentIdCard", files.studentIdCard);
      formDataToSend.append("paymentProof", files.paymentProof);

      await api.post("/applications/apply", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSuccess("Application submitted successfully!");
      setTimeout(() => {
        navigate("/status");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Apply for Certificate</h2>
        <p className="form-subtitle">Fill in your details to apply for Internship/Inplant Certificate</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={submit} className="application-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="collegeName">College Name *</label>
            <input
              id="collegeName"
              name="collegeName"
              type="text"
              placeholder="Enter your college name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNo">Roll Number *</label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Certificate Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Internship">Internship</option>
              <option value="Inplant">Inplant</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <input
              id="duration"
              name="duration"
              type="text"
              placeholder="e.g., 3 months, 6 weeks"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentIdCard">Student ID Card * (Image/PDF)</label>
            <input
              id="studentIdCard"
              name="studentIdCard"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
            />
            {files.studentIdCard && (
              <small className="file-info">Selected: {files.studentIdCard.name}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="paymentProof">Payment Screenshot * (Image/PDF)</label>
            <input
              id="paymentProof"
              name="paymentProof"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
            />
            {files.paymentProof && (
              <small className="file-info">Selected: {files.paymentProof.name}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const CertificateDownload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const res = await api.get(`/applications/${id}`);
      if (res.data.status !== "Approved") {
        setError("Certificate not available. Application not approved yet.");
      } else {
        setCertificate(res.data);
      }
    } catch (err) {
      setError("Failed to fetch certificate details");
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async () => {
    try {
      const res = await api.get(`/applications/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificate.certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to download certificate");
    }
  };

  if (loading) {
    return <div className="loading">Loading certificate...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/status")} className="btn btn-primary">
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="certificate-container">
      <div className="certificate-card">
        <h2>Certificate Ready!</h2>
        <div className="certificate-info">
          <p><strong>Certificate ID:</strong> {certificate.certificateId}</p>
          <p><strong>Name:</strong> {certificate.name}</p>
          <p><strong>College:</strong> {certificate.collegeName}</p>
          <p><strong>Type:</strong> {certificate.type}</p>
          <p><strong>Duration:</strong> {certificate.duration}</p>
          <p><strong>Issued Date:</strong> {new Date(certificate.issuedDate).toLocaleDateString()}</p>
        </div>
        <button onClick={downloadCertificate} className="btn btn-download">
          Download Certificate PDF
        </button>
        <button onClick={() => navigate("/status")} className="btn btn-secondary">
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default CertificateDownload;

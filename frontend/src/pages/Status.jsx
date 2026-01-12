import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Status = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/my-applications");
      setApplications(res.data);
    } catch (err) {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const downloadCertificate = async (id) => {
    try {
      const res = await api.get(`/applications/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to download certificate");
    }
  };

  if (loading) {
    return <div className="loading">Loading your applications...</div>;
  }

  return (
    <div className="status-container">
      <div className="status-header">
        <h2>My Applications</h2>
        <Link to="/apply" className="btn btn-primary">Apply for New Certificate</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {applications.length === 0 ? (
        <div className="no-applications">
          <p>You haven't submitted any applications yet.</p>
          <Link to="/apply" className="btn btn-primary">Apply Now</Link>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => (
            <div key={app._id} className="application-card">
              <div className="application-header">
                <h3>{app.name}</h3>
                <span className={`status-badge ${getStatusClass(app.status)}`}>
                  {app.status}
                </span>
              </div>
              
              <div className="application-details">
                <p><strong>College:</strong> {app.collegeName}</p>
                <p><strong>Roll No:</strong> {app.rollNo}</p>
                <p><strong>Type:</strong> {app.type}</p>
                <p><strong>Duration:</strong> {app.duration}</p>
                <p><strong>Applied On:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                
                {app.status === "Approved" && (
                  <>
                    <p><strong>Certificate ID:</strong> {app.certificateId}</p>
                    <p><strong>Issued Date:</strong> {new Date(app.issuedDate).toLocaleDateString()}</p>
                  </>
                )}
              </div>

              {app.status === "Approved" && (
                <button 
                  onClick={() => downloadCertificate(app._id)}
                  className="btn btn-download"
                >
                  Download Certificate
                </button>
              )}

              {app.status === "Rejected" && (
                <div className="rejected-message">
                  Your application has been rejected. Please contact admin for more details.
                </div>
              )}

              {app.status === "Pending" && (
                <div className="pending-message">
                  Your application is under review. You'll be notified once it's processed.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Status;

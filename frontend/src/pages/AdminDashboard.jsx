import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/all");
      setApplications(res.data);
    } catch (err) {
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      alert(`Application ${status.toLowerCase()} successfully!`);
      fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
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

  const filteredApplications = applications.filter(app => {
    if (filter === "All") return true;
    return app.status === filter;
  });

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>{applications.length}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{applications.filter(a => a.status === "Pending").length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{applications.filter(a => a.status === "Approved").length}</h3>
            <p>Approved</p>
          </div>
          <div className="stat-card">
            <h3>{applications.filter(a => a.status === "Rejected").length}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-bar">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="applications-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>College</th>
              <th>Roll No</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.collegeName}</td>
                <td>{app.rollNo}</td>
                <td>{app.type}</td>
                <td>{app.duration}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-view"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <p className="no-data">No applications found.</p>
        )}
      </div>

      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h4>Personal Information</h4>
                <p><strong>Name:</strong> {selectedApp.name}</p>
                <p><strong>College:</strong> {selectedApp.collegeName}</p>
                <p><strong>Roll No:</strong> {selectedApp.rollNo}</p>
                <p><strong>Type:</strong> {selectedApp.type}</p>
                <p><strong>Duration:</strong> {selectedApp.duration}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${getStatusClass(selectedApp.status)}`}>{selectedApp.status}</span></p>
                <p><strong>Applied On:</strong> {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                
                {selectedApp.status === "Approved" && (
                  <>
                    <p><strong>Certificate ID:</strong> {selectedApp.certificateId}</p>
                    <p><strong>Issued Date:</strong> {new Date(selectedApp.issuedDate).toLocaleDateString()}</p>
                  </>
                )}
              </div>

              <div className="detail-section">
                <h4>Documents</h4>
                <div className="documents">
                  <div className="document-item">
                    <p><strong>Student ID Card:</strong></p>
                    <a 
                      href={`http://localhost:5000/${selectedApp.studentIdCard}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-view-doc"
                    >
                      View Document
                    </a>
                  </div>
                  <div className="document-item">
                    <p><strong>Payment Proof:</strong></p>
                    <a 
                      href={`http://localhost:5000/${selectedApp.paymentProof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-view-doc"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              </div>

              {selectedApp.status === "Pending" && (
                <div className="action-buttons">
                  <button
                    onClick={() => updateStatus(selectedApp._id, "Approved")}
                    className="btn btn-approve"
                  >
                    Approve Application
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp._id, "Rejected")}
                    className="btn btn-reject"
                  >
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

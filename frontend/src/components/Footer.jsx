import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} W3 App Developers. All rights reserved.</p>
        <p>Certificate Generation & Management System</p>
      </div>
    </footer>
  );
};

export default Footer;

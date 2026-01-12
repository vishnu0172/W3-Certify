import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>W3 App Developers</h2>
        </Link>
        <ul className="navbar-menu">
          {user ? (
            <>
              {user.role === "admin" ? (
                <li>
                  <Link to="/admin" className="navbar-link">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/apply" className="navbar-link">
                      Apply
                    </Link>
                  </li>
                  <li>
                    <Link to="/status" className="navbar-link">
                      My Applications
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={logout} className="navbar-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

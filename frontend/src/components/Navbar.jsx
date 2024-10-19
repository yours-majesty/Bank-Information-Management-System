

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css"; 
import { AuthContext } from '../context/AuthContext'; 

function Navbar() {
  const [isActive, setIsActive] = useState("Dashboard");
  const navigate = useNavigate();
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  
  const { isLogin, logout } = useContext(AuthContext);

  function handleLogout() {
    logout(); 
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <p>W3 Business</p>
      </div>
      <ul className="nav-menu">
        {isLogin && ( 
          <>
            <li onClick={() => setIsActive("Add Bank Account")}>
              <Link className={isActive === "Add Bank Account" ? "active" : ""} to="/addAccount">
                Add Bank Account
              </Link>
            </li>
            <li onClick={() => setIsActive("Account Details")}>
              <Link className={isActive === "Account Details" ? "active" : ""} to="/bankAccounts">
                Account Details
              </Link>
            </li>
            <li onClick={() => setIsActive("Redirect to Admin Panel")}>
              <Link className={isActive === "Redirect to Admin Panel" ? "active" : ""} to={`${frontendUrl}`}>
                Redirect to Admin Panel
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="nav-actions">
        {isLogin ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/" className="login-btn">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;


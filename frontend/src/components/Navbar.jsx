import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css"; // Make sure to create this CSS file

function Navbar() {
  const [isActive, setIsActive] = useState("Dashboard");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token presence in localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    setIsLogin(!!token); // Set isLogin based on token presence
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("username");
    setIsLogin(false);
    navigate("/"); // Redirect to login page
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <p>W3 Business</p>
      </div>
      <ul className="nav-menu">
        {isLogin && ( // Show only if logged in
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

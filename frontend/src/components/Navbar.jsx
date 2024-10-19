import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css"; // Make sure to create this CSS file

function Navbar() {
  const [isActive, setIsActive] = useState("Dashboard");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const frontendUrl=import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    // Check for token presence in localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token); 
    setIsLogin(!!token); 
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    

    setIsLogin(false);
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

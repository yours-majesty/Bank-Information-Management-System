// Navbar.js
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import styles from './CSS/Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check for token presence in localStorage
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    setIsLogin(!!token); // Set isLogin based on token presence
  }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('username');
        navigate('/'); // Redirect to login page
    };

    return (
        <div className={styles.navbar}>
            <h1>3W Business</h1>
            <div className={styles.logoutButton}>
            {isLogin ? (
          <button className={styles.button} onClick={handleLogout}>Logout</button>
        ) : (
          <Link  to="/" className={styles.button}>Login</Link>
        )}
            </div>
        </div>
    );
};

export default Navbar;

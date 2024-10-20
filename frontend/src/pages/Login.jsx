import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../CSS/Login.module.css";
import { AuthContext } from "../context/AuthContext"; 

function Login() {
  const { login, token } = useContext(AuthContext);  // Added token from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Redirect if token is present
  useEffect(() => {
    if (token) {
      navigate("/addAccount"); // Redirect to a page like addAccount if token exists
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });

      // Check if login was successful
      if (response.data.success && response.data.token) {
        const usertoken = response.data.token;
        login(usertoken);  // Store the token using login function from AuthContext
        toast.success("Login Successful");
        navigate("/addAccount"); // Redirect after successful login
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }

    } catch (error) {
      console.log("Error Occurred", error.response ? error.response.data : error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h1>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className={styles.button} type="submit">Login In</button>
          </form>
          <p>
            Do not have an account? 
            <Link style={{ color: "yellow", fontWeight: "700", fontFamily: "Poppins" }} to="/signUp"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


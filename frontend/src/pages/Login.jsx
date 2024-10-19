import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../CSS/Login.module.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });
      if (response.data.success) {
        const usertoken = response.data.token;
        setToken(usertoken);
        localStorage.setItem("token", usertoken);
        toast.success(response.data.message);
        window.location.href="/addAccount";
      }
    
    } catch (error) {
      console.log("Error Occured", error);
      toast.error("Internal Sever Error");
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/addAccount");
    }
  }, [token, navigate]);

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
            Do not have an account?<Link style={{color:"yellow",fontWeight:"700",fontFamily:"Poppins"}} to="/signUp">Sign Up</Link>
          </p>
        </div>
      </div>
        
    </div>
  );
}

export default Login;

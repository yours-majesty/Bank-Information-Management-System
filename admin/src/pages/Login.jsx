import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";  // Make sure to include this
import "../CSS/AdminLogin.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const usertoken = response.data.token;
        setToken(usertoken);
        localStorage.setItem("token", usertoken);  // Corrected localStorage usage
        toast.success("Login Successful",{
          onClose:()=>navigate('/dashboard')
        });
        
      } else {
        toast.error(response.data.error || "Login Failed");
      }
    } catch (error) {
      console.log("Some error occurred", error);
      toast.error("Internal Server Error");
    }
  };
useEffect(()=>{
  if(token){
    navigate('/dashboard');
  }
},[navigate,token])
  return (
    <div className="container">
      <div className="admin-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Do not have an Account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

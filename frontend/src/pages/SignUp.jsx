import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "../CSS/SignUp.module.css"

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/register`, {
        name,
        username,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Account Successfully Created");
        navigate("/");
      }
    } catch (error) {
      console.log("Some Error Occured", error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      <div className={styles.SignUpContainer}>
        <div className={styles.SignUpForm}>
            <h1>Sign Up</h1>
          <form className={styles.form1} method="post" onSubmit={handleSubmit}>
            <input
            className={styles.input1}
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
            className={styles.input1}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
            className={styles.input1}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
            className={styles.input1}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className={styles.button1} type="submit">Regiter</button>
          </form>
          <p>
            Already have an account?<Link style={{color:"yellow",fontWeight:"700",fontFamily:"Poppins"}} to="/">Login In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

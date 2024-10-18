import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/SignUp.css"
import { toast } from "react-toastify";

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
      <div className="signup-container">
        <div className="signup-form">
            <h1>Sign Up</h1>
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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

            <button type="submit">Regiter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

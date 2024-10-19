import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import styles from'../CSS/AdminSignUp.module.css';
import { Link } from "react-router-dom";

// Import toastify CSS

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/admin/register`, {
                username,
                email,
                password
            });
            if (response.data.success) {
                toast.success("Account Created Successfully! You can login.", {
                    onClose: () => navigate('/') // Navigate after the toast closes
                });
            }
        } catch (error) {
            console.log('Some error Occurred', error);
            toast.error(error.response?.data?.error || "Some Error Occurred");
        }
    };

    return (
        <div className={styles.SignUpContainer}>
            <div className={styles.SignUpForm}>
          <h1>Admin Sign Up</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                    className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                    className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                    className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className={styles.button} type="submit">Sign Up</button>
                </form>
                <p>
          Already have an Account? <Link to="/">Login</Link>
        </p>
                <ToastContainer />
            </div>
        </div>
    );
}

export default SignUp;

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Fixed imports
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import AddBank from "./pages/AddBank";
import BankAccounts from "./pages/BankAccounts"; // Fixed typo: BankAccounts
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
  return (
    <>
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/addAccount" element={<AddBank />} />
            <Route path="/bankAccounts" element={<BankAccounts />} />
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;


import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; 
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import AddBank from "./pages/AddBank";
import BankAccount from "./pages/BankAccount"; 
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <>
      <AuthProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/addAccount" element={<AddBank />} />
            <Route path="/bankAccounts" element={<BankAccount />} />
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;


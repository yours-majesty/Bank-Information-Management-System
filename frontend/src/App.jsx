import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddBank from "./pages/AddBank";
import BankAccounts from "./pages/BankAccount";
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addAccount" element={<AddBank/>}/>
        <Route path="/bankAccounts" element={<BankAccounts/>}/>


      </Routes>
        <ToastContainer />
    </>
  );
}

export default App;

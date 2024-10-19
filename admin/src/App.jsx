import {Routes ,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/SignUp';
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
function App() {


  return (
    <>

    <Navbar/>
      <Routes>
       <Route path='/' element={<Login/>} />
       <Route path='/sign-up' element={<SignUp/>} />

       <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App

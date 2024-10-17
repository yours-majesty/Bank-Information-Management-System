import { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {

    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [token,setToken]=useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
   
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
      const response = await axios.post(`${backendUrl}/api/login`,{
        email,
        password,
      })
       if(response.data.success){
        
       }


        }catch(error){
            console.log("Error Occured",error)
        }
    }

  return (
    <div>
      <div className="container">
        <div className="user-form">
            <form onSubmit={handleSubmit} >
                

                <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                 />

                 <input type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)} 
                 required
                 />
                

            </form>
        </div>
      </div>
    </div>
  )
}

export default Login

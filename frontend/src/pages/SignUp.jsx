import { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

function SignUp() {

    const [name,setName]=useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
   
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
      const response = await axios.post(`${backendUrl}/api/register`,{
        name,
        username,
        email,
        password,
      });
        }
    }

  return (
    <div>
      <div className="container">
        <div className="user-form">
            <form onSubmit={handleSubmit} >
                <input type="text" 
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>

                <input type="text"
                placeholder="Email"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required />

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

export default SignUp;

import React, { useState,useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Forgot = () => {
  const[email,setEmail]=useState("");

  const navigate=useNavigate();

const forgot=async()=>{
   
        
  
    let result=await fetch('http://localhost:8000/forgot-password',{
      method:"Post",
      body:JSON.stringify({email}),
      headers:{
        'Content-Type':"application/json"
      }
    })
   
    result=await result.json();
  if(result.info){
    alert("A link is sent to your registered email. Kindly check the Spam Folder.")
  }
}


  return (
   
    <div className="main-container">
    <div className='login-form'>
        <br/>
        <h2 className='main-heading'>Reset Password</h2>
        <br/>
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter your Email'/>
        <br />
        <button className='regbtn' onClick={forgot} >Send link</button>
   <br/>
    </div>
</div>

  )
}

export default Forgot



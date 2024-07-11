import React, { useState,useContext, } from 'react'
import { useNavigate,Link,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const Reset = () => {
 
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
const params=useParams();

const reset=async()=>{
    let result=await fetch(`http://127.0.0.1:7000/reset/${params.id}/${params.token}`,{
      method:"Post",
      body:JSON.stringify({password}),
      headers:{
        'Content-Type':"application/json"
      }
    })
   
    result=await result.json();
  
    if(result.reslt){
      
      navigate('/signin');
      alert(`${result.reslt}`);
      
    }
    else{
      alert(`${result.err}`);

      setPassword("");
    }
   
}


  return (
   
    <div className="main-container">
    <div className='login-form'>
        <br/>
        <h2 className='main-heading'>Change Password</h2>
        
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
     <br/>
        <button className='regbtn' onClick={reset} >Reset Password</button>
        <br/>
    </div>
</div>

  )
}

export default Reset;


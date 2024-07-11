import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';


const Register = () => {
  const navigate=useNavigate();
  const[username,setUserName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  
const register=async()=>{
  let result=await fetch('http://localhost:7000/register',{
    method:"Post",
    body:JSON.stringify({username,email,password}),
    headers:{
      'Content-Type':"application/json"
    }
  })
  
  result=await result.json();
  
  if(result.result){
    
    sessionStorage.setItem("user",JSON.stringify(result));
    navigate('/');
  }
  else if(result.err){
    alert(`${result.err}`);
    setUserName("");
    setEmail("");
    setPassword("");
  
  }
  else{
    alert(`${result.error}`);
    navigate('/register');
  }
 
 
}

  return (
    <div className="main-container">
    <div className='form'>
        <br/>
        <h2 className='main-heading'>Register Now</h2>
        <br/>
        <input type='text' value={username} onChange={(e)=>{setUserName(e.target.value)}} placeholder='Enter your UserName'/>
        <br />
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter your Email'/>
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
        <button className='regbtn'  onClick={register}>Create Account</button>
        <p>Already have an account?? <Link to='/signin'><a style={{color:"rgb(28, 160, 212)"}}>LOG IN</a></Link></p>
    </div>
</div>
  )
}

export default Register


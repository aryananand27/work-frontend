import React, { useState,useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignIn = () => {
  const[username,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const [url,setUrl]=useState("");
  const navigate=useNavigate();

const login=async()=>{
    let result=await fetch('http://localhost:8000/login',{
      method:"Post",
      body:JSON.stringify({username,password}),
      headers:{
        'Content-Type':"application/json"
      }
    })
   
    result=await result.json();
  
    if(result.result){
      sessionStorage.setItem('user',JSON.stringify(result));
      navigate('/');
      
    }
    else{
      alert(`${result.err}`);
      setUserName("");
      setPassword("");
    }
   
}

  return (
   
    <div className="main-container">
    <div className='login-form'>
        <br/>
        <h2 className='main-heading'>Login to Account</h2>
        <br/>
       
        <input type='email' value={username} onChange={(e)=>{setUserName(e.target.value)}}  placeholder='Enter your UserName'/>
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
       <br/>
        <button className='regbtn' onClick={login} >SignIn</button>
        <p><Link to='/forgot-password'><a style={{color:"rgb(28, 160, 212)"}}>Forgot Password?</a></Link></p>
        <p>Don't have a account?? <Link to='/register'><a style={{color:"rgb(28, 160, 212)"}}>Register Now</a></Link></p>
    </div>
</div>

  )
}

export default SignIn


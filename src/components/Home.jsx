import React, { useState,useContext, useEffect } from 'react'
import { Stack,Box,Typography } from '@mui/material'
import PostCard from './PostCard'
import { CounterContext } from './count'

const Home = () => {
  const [postArr,setPostArr]=useState([]);
  let auth=JSON.parse(sessionStorage.getItem('user'));
  const counterContext=useContext(CounterContext);
  
  const getdata=async()=>{
    let token;
      if(auth){
         token=auth.token;
      }
    
    let result=await fetch('http://localhost:8000/getposts',{
      method:"Get",
      headers:{
      "authorization":`bearer ${token}`,
      "Content-Type":"application/json"
   
    }
    })
    result=await result.json();
    if(result){
      setPostArr(result);
    }
    else{
      if(result.reslt){
        setPostArr([]);
      }
    }
  }
  useEffect(()=>{
      getdata();
  },[counterContext.count+counterContext.subcount]);
  // console.log(postArr);
  return (
   <div className='feed-container'>
   

   {auth && auth.result&&
   <div style={{width:"40vw",paddingBottom:"12px"}}>
     <div>
      {postArr&&postArr.length>0? <>
        {postArr.map((ele,idx)=>(
          
          <PostCard ele={ele}/>
        ))}
      </>:<h1 style={{color:"white"}}>Today Feed is Empty.</h1>}
     </div>
  </div> }
  {!auth && <h1 style={{color:"white"}}>Home</h1>}
      </div>
  )
}

export default Home

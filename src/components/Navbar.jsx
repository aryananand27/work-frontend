import React, { useEffect, useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import {logo} from '../utils/constants'
import { IconButton, Stack ,Typography} from '@mui/material'




const Navbar = () => {
    const navigate=useNavigate();
const auth=sessionStorage.getItem("user");
 console.log(auth);
 const logout=()=>{
    sessionStorage.clear();
    navigate('/');
 }
 
   return(
    <Stack direction="row" alignItems="center" p={2} sx={{position:
        "sticky",background:"#000",justifyContent:"space-between",top:"0"}}>
            <Link to="/" style={{display:"flex",alignItems:"center"}} >
                {/* <img src={logo} alt="logo" height={40} className='logo-img'/> */}
                <Typography sx={{color:"#fff",paddingLeft:{sm:"4px",md:"4px",lg:"6px"},fontWeight:"bold",fontSize:{xs:"14px",sm:"18px",md:"20px",lg:"30px"}}} >Demo</Typography>
               
            </Link>
            {auth? <><Link to='/signin'>
                <button className='btn' onClick={logout}>Logout</button>
            </Link></>:<><Link to='/register'>
                <button className='btn'>Register</button>
            </Link></>}
            
            </Stack>
   )
}
  


export default Navbar


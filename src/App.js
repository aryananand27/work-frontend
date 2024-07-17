import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Forgot from './components/Forgot'
import Reset from './components/Reset'
import {Box} from '@mui/material'
import Posts from './components/Posts'




const App = () =>(
 
  
    <BrowserRouter>  
       <Box sx={{background:"#000"}}>  
            <Navbar/>    
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/forgot-password' element={<Forgot/>}/>
                <Route path='/reset/:id/:token' element={<Reset/>}/>
            </Routes>
       </Box>
       
    </BrowserRouter>
  );


export default App

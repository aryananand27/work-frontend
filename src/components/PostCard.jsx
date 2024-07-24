import React, { useState,useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import { Tooltip } from '@mui/material';
import Message from './Message'
import { CounterContext } from './count';

const PostCard = ({ele} ) => {
    const [newComment,setNewComment]=useState("");
    const [dislike,setDislike]=useState(true);

    let auth=JSON.parse(sessionStorage.getItem('user'));
    let message,name;
    let counterContext=useContext(CounterContext);
    const countLikes=async(id)=>{
        const token=JSON.parse(sessionStorage.getItem('user')).token;
        let result=await fetch(`http://localhost:8000/likes/${id}`,{
            method:"Put",
            headers:{
                "authorization":`bearer ${token}`,
                "Content-Type":"application/json"
       
        }
        })
        setDislike(!dislike);
        result=await result.json();
        if(result.reslt){
            alert(`${result.reslt}`);
        }
       else if(result.acknowledged){
            counterContext.setCount(counterContext.count+1);
            alert(`You liked ${ele.name}'s post.`)
        }
    }
const countDisLikes=async(id)=>{
    const token=JSON.parse(sessionStorage.getItem('user')).token;
    let result=await fetch(`http://localhost:8000/dislikes/${id}`,{
        method:"Put",
        headers:{
                "authorization":`bearer ${token}`,
                "Content-Type":"application/json"
       
        }
    })
    setDislike(!dislike);
    result=await result.json();
    if(result.reslt){
        alert(`${result.reslt}`);
    }
    else if(result.acknowledged){
        counterContext.setSubCount(counterContext.subcount+1);
        alert(`You disliked ${ele.name}'s post.`)
    }
}

    const addComment=async(id)=>{
        const token=JSON.parse(sessionStorage.getItem('user')).token;
        if(auth && auth.result){
            name=auth.result.username;
            message=newComment;
        }
        
        let result=await fetch(`http://localhost:8000/messages/${id}`,{
            method:"Put",
            body:JSON.stringify({name,message}),
            headers:{
                "authorization":`bearer ${token}`,
                "Content-Type":"application/json"
        }
        })
        result=await result.json();
    
        if(result.reslt){
            alert(`${result.reslt}`);
        }
        else if(result.result.acknowledged){
            alert("comment added.");
            setNewComment("");
        }
    }
  return (
    <div className="card">
      <div className="header">
          <div className="author">{auth.result.username===ele.name ?`You(${ele.name})`: `${ele.name}` }</div>
          <div className="timestamp">posted on {ele.date}</div>
      </div>
      <div className="content">
        <img src={ele.image} alt="pics" />
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
    <div style={{display:"flex",flexDirection:"row"}}>
      {dislike? <button className='favbtn' onClick={()=>{countLikes(`${ele._id}`)}} >
      <Tooltip title="Like" arrow>
      <FavoriteBorderIcon /></Tooltip>
      </button>:<button className='favbtn' onClick={()=>{countDisLikes(`${ele._id}`)}} >
      <Tooltip title="DisLike" arrow>
      <FavoriteBorderIcon sx={{color:"red"}} /></Tooltip>
      </button>}
      <div>
      <h5 style={{position:"relative",fontFamily:" 'Baloo Bhai 2', sans-serif",color:"white",top:"-10px"}}>{ele.likecount} Likes</h5></div>
      </div>

      {/* <ToastContainer position='top-center' theme='dark' width="100px" height="100px" /> */}
      <Message ele={ele}/>
      {/* <ToastContainer position='top-center' theme='dark' /> */}
     
      </div>
      <div>
        <h4 style={{position:"relative",fontFamily:" 'Baloo Bhai 2', sans-serif",color:"white",top:"-30px"}}>{ele.title.slice(0,40)}....</h4></div>
        <div>
        
        </div>
        <div  style={{display:"flex",flexDirection:"row"}}>
        <input type='text' value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} placeholder='Write Your Comment'/>
        <button className='favbtn' onClick={()=>{addComment(`${ele._id}`)}}><Tooltip title="Send"> <SendIcon/> </Tooltip></button></div>
      </div>
    </div>
  );
};

export default PostCard;
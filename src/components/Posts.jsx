
import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  console.log(`bearer ${JSON.parse(sessionStorage.getItem('user')).token}`)
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [load,setLoad]=useState(false);
let [title,setTitle]=useState('');
let auth=JSON.parse(sessionStorage.getItem('user'));
let userId,name,image,likecount,date,comments;

const navigate=useNavigate();

const handlePost=async()=>{
  if(auth &&auth.result){
    userId=auth.result._id;
    name=auth.result.username;
    image=fileUrl;
    likecount=0;
    date=new Date().toDateString();
  }
 const token=JSON.parse(sessionStorage.getItem('user')).token;
  
  let result=await fetch('http://localhost:8000/posts',{
    method:"Post",
    body:JSON.stringify({userId,name,image,likecount,title,date,comments}),
    headers:{
      "authorization":`bearer ${token}`,
      "Content-Type":"application/json"
   
    }
  })
  result=await result.json();
  if(result.result){
    navigate('/');
  }
  else{
    if(result.reslt){
      alert(`${result.reslt}`);
  }
  else if(result.error){
        alert(`${result.error}`);
    }
  }

}

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
 
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  setLoad(true);
    
    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUrl(response.data.fileUrl);
      alert("file uploaded successfully..")
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="main-container">
          <div className='post-form'>
            <h2 className='main-heading'>Create Post</h2>
            <br/>
           
              <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}  placeholder='Write your Title Here..'/>
             
           <br/>
          
             <input type="file" onChange={handleFileChange} />
             <div style={{display:"flex",flexDirection:"row"}}>
             <button className='uplbtn'  onClick={handleUpload}>Save Your Media</button>
             {fileUrl ? (
          <img src={fileUrl} alt="Uploaded file" style={{width:"32px",height:"32px"}} />
      ):<>{load&&<h4 style={{color:"white",marginTop:"-1px"}}>Loading....</h4>}</>}
            </div>
             <br/>
             <button className='regbtn' onClick={handlePost}>Send Post</button>
             <br/>
          </div>

   </div>
  )
}

export default Posts

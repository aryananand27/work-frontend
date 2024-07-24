import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useActionData } from 'react-router-dom';
import { NoBackpackSharp } from '@mui/icons-material';
import { CounterContext } from './count';

export default function AccountMenu({ele}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[allComments,setAllComments]=React.useState([]);
  let counterContext=React.useContext(CounterContext);

  let auth=JSON.parse(sessionStorage.getItem('user'));
  
  const open = Boolean(anchorEl);
  const handleClick = async(event) => {
    setAnchorEl(event.currentTarget);
    const token=JSON.parse(sessionStorage.getItem('user')).token;
    let result=await fetch(`https://work-backend-seven.vercel.app/getpost/${ele._id}`,{
        method:"Get",
        headers:{
          "authorization":`bearer ${token}`,
          "Content-Type":"application/json"
        }
    })
    result=await result.json();
    if(result.reslt){
      alert(`${result.reslt}`)
    }
    else{
      setAllComments(result.comments);
    counterContext.setCount(allComments.length);
    }
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
        <Tooltip title="comments">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            
          >
         
          <MessageIcon sx={{ width: 25, height: 25 }} className='favbtn'/>
            
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            
            color:"white",
            background:"black",
            width:"550px",
            height:"150px",
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt:-5,
            // mr:5,
            ml:-5,
            
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'relative',
              top: 0,
              right: 14,
              width: 7,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      {allComments && allComments.length>0?<>
      {  allComments.map((ele)=>(
            <MenuItem>
                <h4 style={{fontFamily:" 'Baloo Bhai 2', sans-serif",color:"white"}}>{auth.result.username===ele.name ?`You`: `${ele.name}` }: &nbsp;</h4>
                <h5 style={{fontFamily:" 'Baloo Bhai 2', sans-serif",color:"gray", width:"40%", height:"22px",borderRadius:"10px", background:"tranparent",textAlign:"center" }}>{ele.message}</h5>
            </MenuItem>
        ))}

      </>:<MenuItem > No Comments Yet.</MenuItem>}
        
      </Menu>
    </React.Fragment>
  );
}

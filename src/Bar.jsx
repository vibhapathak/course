import React, { useEffect, useState } from 'react';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useNavigate } from 'react-router-dom';


function Bar(){
  const navigate = useNavigate();
 const [useremail, setuseremail] = useState(null);

  useEffect(()=>{
    function callback2(data){
      if(data.username){
        setuseremail(data.username);
      }
    }
    function callback1(res){
      res.json().then(callback2);
    }
    console.log(localStorage.getItem("token"))

    fetch("http://localhost:3000/admin/me",{
      method:"GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(callback1);
  }, []);

if(useremail){
return (
<div style={
  {
    display: "flex",
    justifyContent: "space-between",
    padding: 4
  }
} >
  <div>
  <Typography variant={"h6"}>Coursera</Typography>
  </div>
  <div style={{display: "flex"}} >
    <div>{useremail}</div>
  <div style={{marginRight: 10}}>

<Button 
variant={"contained"}
onClick={()=>{
  localStorage.setItem("token",null)
window.location ="/";
}}
>
  Logout
</Button>

</div>
<div>
<Button variant={"contained"}
onClick={()=>{
  navigate("/signin");
}}>
SignIn
</Button>
</div>
  </div>
</div>
);




}
else{
  return <div style={
    {
      display: "flex",
      justifyContent: "space-between",
      padding: 4
    }
  } >
    <div>
    <Typography variant={"h6"}>Coursera</Typography>
    </div>
    <div style={{display: "flex"}} >
    <div style={{marginRight: 10}}>
  
  <Button 
  variant={"contained"}
  onClick={()=>{
    window.location ="/signup"
  }}
  >
    Signup
  </Button>
  
  </div>
  <div>
  <Button variant={"contained"}
  onClick={()=>{
    window.location ="/signin"
  }}>
    Signin
  </Button>
  </div>
    </div>
  
  
  </div>
}




}
export default Bar;
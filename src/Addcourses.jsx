import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import React, { useState } from 'react';


function Addcourses(){
  const [title, settitle] = useState()
  const [description, setdescription] = useState()
  const [Image,setImage] = useState("")

return <div style={{ display: "flex",
  justifyContent: "center"
}}> 
<Card variant ={"outlined}"} style={
  {
     width: 400,
     paddng: 20
  }}>

   <TextField 
      onChange={(e) => {
        settitle(e.target.value);
            }}
           fullWidth={true}
            label="Title" 
            variant="outlined" 
             />
          <TextField 
         onChange={(e) => {
          setdescription(e.target.value);
              }}
             fullWidth={true}
            label="Description" 
            variant="outlined" 
            />
            <TextField 
         onChange={(e) => {
          setImage(e.target.value);
              }}
             fullWidth={true}
           
            label="Image-Link" 
            variant="outlined" 
            />
           
          <Button
          size ={"large"}
          variant="contained"
          onClick={() => {
            function callback2(data){
              alert('course added')
            }
            function callback1(res) {
              if (res.ok) {
                res.json().then(callback2);
              } else {
                // Handle error cases, e.g., display an error message or log the error
                console.error("Error in response:", res.statusText);
              }
            }
            
        
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description:description,
                imageLink: Image,
                published: true
              }),
              headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")

                }

              
            }).then(callback1)
   
              
          }}
         
           >Add Courses</Button>

  </Card>
</div>
}
export default Addcourses;
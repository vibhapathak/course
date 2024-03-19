import { useEffect } from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";


function Courses(){
  const [courses,setcourses] = useState([]);
useEffect(()=>{
  function callback2(data){
    setcourses(data.courses);
  }
  function callback1(res){
    res.json().then(callback2);
  }
  fetch("http://localhost:3000/admin/courses",{
    method: "GET",
    headers: {
 "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  }).then(callback1)
}, []);


 return(
 
<div style ={{
  display:"flex",
  flexWrap: "wrap",
  justifyContent: "center"
}}>
{courses && courses.map(course => (
  <Course key={course.id} course={course} />
))}
</div>

 );
}
 export function Course(props){
  return <Card style={{
    border: "2px solid black",
    margin: 10,
    width: 250,
    minHeight:200
    
  }}>
    <Typography 
    textAlign= {"center"}
    variant={"h6"}>
      {props.course.title}
      </Typography>
      <img src={props.course.imageLink} style={{ width: 300 }} alt="" />

  </Card>
  
}

export default Courses;

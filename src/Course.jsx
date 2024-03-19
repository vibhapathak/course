import { useEffect } from "react";
import { useState} from "react";
import { useParams } from "react-router-dom";
import {Card} from "@mui/material";
import { Typography,TextField, Button } from "@mui/material";
import {atom, useSetRecoilState,useRecoilState, useRecoilValue} from 'recoil';


  function Course(){
  let {courseId} = useParams();
    const setCourses = useSetRecoilState(coursesState);

    useEffect(()=>{

      function callback2(data){
      setCourses(data.courses);
    }
    function callback1(res){
      res.json().then(callback2)
    }
    fetch('http://localhost:3000/admin/courses/',{
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(callback1)

  }, []);

    

   
    return(
      <div>
    <CourseCard courseId = {courseId}/>
    <UpdateCard courseId={courseId}/>

    </div>
    );
}


    function UpdateCard(props){
      const [title, settitle] = useState("");
      const [description, setdescription] = useState("");
      const [Image,setImage] = useState("");
    const course = props.course;
    const [courses, setCourses] = useRecoilState(coursesState)

    return <div style={{ 
      display: "flex",
      justifyContent: "center"
    }}> 
    <Card variant ={"outlined"} style={
      {
        width: 400,
        paddng: 20
      }}>

  <Typography>Update Course Details</Typography>

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
              
            let updatedCourses = [];
            for(let i = 0; i<courses.length; i++){
               if(courses[i].id== props.courseId){
                updatedCourses.push( {
                  id: props.courseId,
                  title: title,
                  description: description,
                  imageLink: Image
                     })
                   } 
              else {
                updatedCourses.push(courses[i]);
                }
            }

          setCourses(updatedCourses);
            }

            function callback1(res) {
              if (res.ok) {
                res.json().then(callback2);
              } else {
                // Handle error cases, e.g., display an error message or log the error
                console.error("Error in response:", res.statusText);
              }
            }
            
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
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
         
           >Update Course</Button>

  </Card>
</div>
        }
        function CourseCard(props){

          const courses = useRecoilValue(coursesState)
          let course = null;
            for(let i = 0; i<courses.length; i++){
              if(courses[i].id == props.courseId){
                course = courses[i]
              }
            }
            if(!course){
              return <div>
                Loading
              </div>
            }
          return (
              <div style ={{  
            display: "flex",
            justifyContent: "center",
              }}>

          <Card style={{
                border: "2px solid black",
                margin: 10,
                width: 250,
                minHeight:200
              
            }}>
              <Typography textAlign= {"center"} variant={"h6"}>{course.title}</Typography>
              <Typography textAlign= {"center"} variant={"h6"}>{course.description}</Typography>
              <img src={course.imageLink} style={{ width: 300 }} alt="" />
          </Card>

            </div>);
}
export default  Course;

const coursesState = atom({
  key: 'coursesState',
  default: '',
});

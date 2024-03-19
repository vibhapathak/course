import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bar from "./Bar.jsx"
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Addcourses from "./Addcourses.jsx";
import Courses from "./Courses.jsx";
import Course from "./Course.jsx";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';



function App() {
  return (

<div style={{
  width:  "100vw",
  height: "100vh",
  backgroundColor: "#eeeeee"
}}>

<RecoilRoot>
  <Router>
    <div>
    <Bar></Bar>
    </div>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/addcourses" element ={<Addcourses/>} />
      <Route path="/course/:courseId" element ={<Course/>} />
    </Routes>     
  </Router>
</RecoilRoot>
</div>
   
  );

}
export default App;


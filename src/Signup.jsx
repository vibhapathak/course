import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";

function Signup() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  
  return (
    <div > 
      <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
      }}>
        <Typography variant={"h6"}>
          Welcome. Sign up Below
        </Typography>
      </div>
    
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Card variant={"outlined"} style={{
          width: 400,
          padding: 20
        }}>
          <TextField 
            onChange={(e) => {
              setemail(e.target.value);
            }}
            fullWidth={true}
            id={"username"}
            label="Email" 
            variant="outlined" 
          />
          <br /><br />
          <TextField 
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            fullWidth={true}
            id={"password"} 
            label="Password" 
            variant="outlined" 
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={'large'}
            variant="contained"
            onClick={() => {
              function callback2(data){
                localStorage.setItem("token", data.token);
                console.log("token: ", data.token);
              }
              function callback1(res){
                res.json().then(callback2)
              }

              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                }
              }).then(callback1);
            }}
          >
            Click Here
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;

import {
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate , useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import App, { AppContext } from '../../App';


export default function EditPage() {

  const {date, currentTime} = useContext(AppContext)

  const navigate = useNavigate();
  const [textFieldVal, setTextFieldVal] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    subject: "",
    division: "",
    rollNumber: "",
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setTextFieldVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  
  const { id } = useParams("");
  console.log(id)

  const getdata = async () => {
    const res = await fetch(`https://studentrecord-backend.onrender.com/getstudent/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setTextFieldVal(data);
      console.log(" get data ");
    }
  };

  useEffect(() => {
    getdata();
  },[]);


  const updateStudent =async (e)=>{
    e.preventDefault();

    const {
      firstName,
      middleName,
      lastName,
      subject,
      division,
      rollNumber
    } = textFieldVal;

        const res2 = await fetch(`https://studentrecord-backend.onrender.com/updatestudent/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstName,
              middleName,
              lastName,
              subject,
              division,
              rollNumber
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            alert("data added");
            navigate('/nav/managepage');
        }

  } 

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "95vw",
          position: "absolute",
          top: "10%",
          left: "5%",
        }}
      >
        <Toolbar sx={{ margin: "1rem 6rem" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit Student
          </Typography>
          <Typography variant="p" component="div">
            {date} {currentTime}
          </Typography>
        </Toolbar>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30%" },
            padding: " 0rem 4rem",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="firstName"
              placeholder="First name"
              name="firstName"
              onChange={setData}
              value={textFieldVal.firstName}
            />
            <TextField
              required
              id="middleName"
              placeholder="Middle Name"
              name="middleName"
              onChange={setData}
              value={textFieldVal.middleName}
            />
            <TextField
              required
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              onChange={setData}
              value={textFieldVal.lastName}
            />
          </div>
          <div>
            <TextField
              id="subject"
              select
              label="Select subject"
              name="subject"
              onChange={setData}
              value={textFieldVal.subject}
            >
              <MenuItem value="B.Sc">B.Sc</MenuItem>
                <MenuItem value="B.Com">B.Com</MenuItem>
                <MenuItem value="BA">BA</MenuItem>
                <MenuItem value="B.Tech">B.Tech</MenuItem>
                <MenuItem value="BE">BE</MenuItem>
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="BBA">BBA</MenuItem>
            </TextField>
            <TextField
              id="division"
              select
              label="Select Division"
              name="division"
              onChange={setData}
              value={textFieldVal.division}
            >
              <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
            </TextField>
            <TextField
              required
              id="rollNumber"
              placeholder="Roll Number"
              onChange={setData}
              value={textFieldVal.rollNumber}
              name="rollNumber"
            />
          </div>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "30%",
              margin: "2rem .5rem",
              backgroundColor: "#FF6E31",
            }}
            type="submit"
            onClick={updateStudent}
          >
            Edit Student
          </Button>
        </Box>
      </Box>
    </>
  );
}

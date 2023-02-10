import {
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from 'react';
import { AppContext } from '../../App';


export default function AddStudent() {

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, middleName, lastName, subject, division, rollNumber } =
      textFieldVal;

    const res = await fetch(
      "https://studentrecord-backend.onrender.com/addstudent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          subject,
          division,
          rollNumber,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Please enter all the fields ");
      console.log("error ");
    } else {
      console.log("added sucessfully ");
      navigate("/nav/managepage");
    }
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "95vw",
          position: "absolute",
          top: "10%",
          left: "5%",
          padding: " 1rem",
        }}
      >
        <Toolbar sx={{ margin: "1rem" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Student
          </Typography>
          <Typography variant="p" component="div">
           {date} {currentTime}
          </Typography>
        </Toolbar>
        <Box className="wrapper">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30%" },
            }}
            className="fieldsBox"
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
                className="w"
              />
              <TextField
                required
                id="middleName"
                placeholder="Middle Name"
                name="middleName"
                onChange={setData}
                value={textFieldVal.middleName}
                className="w"
              />
              <TextField
                required
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                onChange={setData}
                value={textFieldVal.lastName}
                className="w"
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
                className="w20"
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
                className="w20"
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
                className="w"
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "45%" },
            }}
            className="addresBox"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="address1"
                label="Address Line 1"
                multiline
                maxRows={4}
                style={{ marginRight: "1.5rem" }}
                name="address1"
                onChange={setData}
                value={textFieldVal.address1}
                className="w"
              />
              <TextField
                id="address2"
                label="Address Line 2"
                multiline
                maxRows={4}
                name="address2"
                onChange={setData}
                value={textFieldVal.address2}
                className="w"
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="landmark"
                placeholder="Landmark"
                name="landmark"
                onChange={setData}
                value={textFieldVal.landmark}
                className="w"
              />
              <TextField
                required
                id="city"
                placeholder="City"
                name="city"
                onChange={setData}
                value={textFieldVal.city}
                className="w"
              />
              <TextField
                required
                id="pincode"
                placeholder="Pincode"
                name="pincode"
                onChange={setData}
                value={textFieldVal.pincode}
                className="w"
              />
            </div>

            <Button
              variant="contained"
              size="large"
              sx={{
                width: "30%",
                margin: "2rem .5rem",
                backgroundColor: "red",
              }}
              type="submit"
              onClick={handleSubmit}
              className="submitBtn"
            >
              Add Student
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

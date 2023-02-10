import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import './style.css'

const Details = () => {
  const { id } = useParams("");

  const [fetechedData, setfetchedData] = useState([]);
  console.log(fetechedData);

  const getdata = async () => {
    const res = await fetch(
      `https://studentrecord-backend.onrender.com/getstudent/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setfetchedData(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <Box className="box">
      <Card sx={{ width:"100%", minHeight: 300 }} >
        <CardContent className="cardContent">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Student Card
          </Typography>
          <Typography variant="h5" sx={{ marginTop: "1.5rem" }} component="div">
            {`${fetechedData.firstName} ${fetechedData.middleName} ${fetechedData.lastName} `}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Class - {fetechedData.subject}
          </Typography>
          <Typography variant="p">
            Roll Number - {fetechedData.rollNumber}
          </Typography>

          <Typography
            variant="p"
            sx={{ marginTop: "6rem", float: "right" }}
            component="div"
          >
            Student Signature
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Details;

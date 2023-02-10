import "./style.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useContext } from 'react';
import { AppContext } from '../../App';


export default function ManagePage() {

  const {date, currentTime} = useContext(AppContext)

  

  const [fetechedData, setfetchedData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getdata = async (e) => {
    const res = await fetch(
      "https://studentrecord-backend.onrender.com/getdata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setfetchedData(data);
      setLoader(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteStudent = async (id) => {
    const res2 = await fetch(
      `https://studentrecord-backend.onrender.com/deletestudent/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      alert("error");
      console.log("error ");
    } else {
      console.log("user deleted");
      getdata();
    }
  };


  return (
    <>
      <Box
        style={{
          height: "100vh",
          width: "95%",
          position: "absolute",
          top: "10%",
          left: "5%",
          padding: " 1rem 1rem 1rem 2.5rem",
        }}
      >
        <Toolbar className="posfix">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
            className="managetxt"
          >
            Manage Student
          </Typography>
          <Typography variant="p" component="div" align="right">
            {date} {currentTime}
          </Typography>
        </Toolbar>
        {loader ? (
          <Box
            sx={{
              display: "flex",
              fontSize: "40%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Loading....
              </Typography>
            </Toolbar>
          </Box>
        ) : (
          <Paper sx={{ width: "100%" }}>
            <TableContainer style={{ maxHeight: 600 }}>
              <Table style={{ minHeight: 800 }} aria-label="customized table">
                <TableHead style={{ backgroundColor: "red" }}>
                  <TableRow>
                    <TableCell className="fs-1">Name</TableCell>
                    <TableCell className="fs-1">Class</TableCell>
                    <TableCell className="fs-1">Roll No</TableCell>
                    <TableCell
                      className="fs-1"
                      sx={{ width: "35%", textAlign: "center" }}
                    >
                      View/Edit/Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetechedData.map((data, id) => {
                    return (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            ":nth-child(odd)": { backgroundColor: "#DDDDDD" },
                          }}
                          key={id}
                          className="trow"
                        >
                          <TableCell className="fs-bodycell">
                            {data.firstName}
                          </TableCell>
                          <TableCell className="fs-bodycell">
                            {data.subject}
                          </TableCell>
                          <TableCell className="fs-bodycell">
                            {data.rollNumber}
                          </TableCell>
                          <TableCell
                            className="fs-bodycell"
                            sx={{ width: "30%", textAlign: "center" }}
                          >
                            <Link to={`/nav/detail/${data._id}`}>
                              <Button sx={{ color: "red" }}>
                                <VisibilityIcon />
                              </Button>
                            </Link>
                            <Link to={`/nav/edit/${data._id}`}>
                              <Button sx={{ color: "red" }}>
                                <EditIcon />
                              </Button>
                            </Link>
                            <Button
                              sx={{ color: "red" }}
                              onClick={() => deleteStudent(data._id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                          <Outlet />
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </>
  );
}

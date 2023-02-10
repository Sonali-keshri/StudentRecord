import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { createUserWithEmailAndPassword ,updateProfile } from 'firebase/auth'
// import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import {useUserAuth} from '../../context/UserAuthContext'

const theme = createTheme();

export default function Signup() {

    const navigate = useNavigate()

       const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
        });
       const [error, setError] = useState("");

        const setData = (e) => {
              setValues((preval) => {
                return { ...preval, [e.target.name]: e.target.value };
              });
            };
        const {signup} = useUserAuth();

            // console.log(values)
            
            const handleSubmit = async(e) => {
              e.preventDefault();
              if(!values.name || !values.email || !values.password){
                        setError("Please fill the form")
                        return;
                    }
              setError("")
              console.log(values)
              try {
                await signup(values.email, values.password)
                navigate('/nav/managepage')
              } catch (err) {
                setError(err.message)
              }
        }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}  style={{backgroundColor:"red"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

        {  error && <Alert sx={{minWidth:"400px"}} severity="error">
            {error} <strong>check it out!</strong>
          </Alert>}
          
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={setData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={setData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={setData}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            //   disabled={submitDisable}
              style={{backgroundColor:"red"}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

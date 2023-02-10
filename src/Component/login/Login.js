import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";


import {useUserAuth} from '../../context/UserAuthContext'

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
      });
     const [error, setError] = useState("");

      const setData = (e) => {
            setValues((preval) => {
              return { ...preval, [e.target.name]: e.target.value };
            });
          };
      const {login} = useUserAuth();

          // console.log(values)
          
          const handleSubmit = async(e) => {
            e.preventDefault();
            if(!values.email || !values.password){
              setError("Please fill the form")
              return;
          }
            setError("")
            console.log(values)
            try {
              await login(values.email, values.password)
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
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            style={{ backgroundColor: "red" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Alert sx={{ minWidth: "400px" }} severity="error">
              {error} <strong>check it out!</strong>
            </Alert>
          )}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={setData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={setData}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              // disabled={submitDisable}
              style={{ backgroundColor: "red" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

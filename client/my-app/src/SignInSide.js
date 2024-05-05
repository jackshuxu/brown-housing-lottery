import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage1 from "./photos/brownuniversity.png";
import backgroundImage2 from "./photos/brownuniversity2.jpg";
import backgroundImage3 from "./photos/brownuniversity3.jpg";
import backgroundImage4 from "./photos/brownuniversity4.jpg";
import cuteBearImage from "./photos/cuteBear.png"
import { GoogleButton } from 'react-google-button'
import {UserAuth} from './context/AuthContext';
import "./components/Header.css";

const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4];

const randomBackgroundImage =
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const defaultTheme = createTheme();

export default function SignInSide() {
  const { googleSignIn } = UserAuth();

    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            backgroundImage: `url(${randomBackgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Grid item xs={11} sm={8} md={5} lg={3} xl={2}>
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
                height: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <img
                src={cuteBearImage}
                alt="Brown Bear Logo"
                style={{
                  position: "relative",
                  top: -15,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  objectFit: "cover",
                  opacity: 1,
                }}
              />
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  fontFamily: '"Ubuntu Sans Mono", monospace',
                  marginLeft: "1rem",
                  marginTop: "-2rem",
                }}
              >
                Bear Home
              </Typography>
              <GoogleButton
                onClick={() => googleSignIn()}
                style={{ width: "100%", marginTop: 15 }}
              />
              <Typography
                component="h1"
                variant="h8"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  fontFamily: '"Ubuntu Sans Mono", monospace',
                  marginTop: 1,
                }}
              >
                Please sign in with your Brown email address!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}

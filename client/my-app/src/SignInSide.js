import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage1 from "./photos/brownuniversity.png";
import backgroundImage2 from "./photos/brownuniversity2.jpg";
import backgroundImage3 from "./photos/brownuniversity3.jpg";
import cuteBearImage from "./photos/cuteBear.png"
import { GoogleButton } from 'react-google-button'
import {UserAuth} from './context/AuthContext';

const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

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
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "50%",
                  objectFit: "cover", // Covers the entire area of the paper
                  opacity: 1, // Adjust opacity as needed
                }}
              />
              <Typography
                component="h1"
                variant="h5"
                sx={{fontWeight: 'bold'}}
              >
                Brown Housing Lottery
              </Typography>
              <GoogleButton
                onClick={() => googleSignIn()}
                style={{ width: "100%", marginTop: 20 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}

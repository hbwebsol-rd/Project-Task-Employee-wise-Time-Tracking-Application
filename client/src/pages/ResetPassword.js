import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useStyles } from "../views/view-css";
import Image from "../image/reset.png";
import ResetSuccess from "../components/ResetSuccess";
import Logo from "../image/worklog.png";

const ResetPassword = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <div className={classes.loginMain}>
      <div
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box className={classes.loginImageBox}>
        <Box
            component="img"
            sx={{
              height: 50,
              objectFit: "contain",
              margin: "15px",
              mt: "25px",
              mb: "4rem",
            }}
            alt="The house from the offer."
            src={`${Logo}`}
          />
        </Box>
      </div>
      <div className={classes.loginForm}>
        <Box className={classes.loginRoot}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
            />
            <ResetSuccess open={open} setOpen={setOpen} classes={classes} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#3525b5" }}
            >
              Send Link to reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Return to Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ResetPassword;

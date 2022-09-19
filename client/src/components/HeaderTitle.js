import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../image/worklog.png";

const HeaderTitle = ({ classes }) => {
  const location = useLocation();
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/home" ||
    location.pathname === "/profile"
  ) {
    return (
      <Link to="/home" style={{ textDecoration: "none" }}>
        <Box
          component="img"
          sx={{
            height: 40,
            width: 100,
          }}
          alt="The house from the offer."
          src={`${Logo}`}
        />
      </Link>
    );
  }
  if (location.pathname === "/employee") {
    return <Typography className={classes.title}>EMPLOYEES</Typography>;
  }
  if (location.pathname === "/client") {
    return <Typography className={classes.title}>CLIENT</Typography>;
  }
  if (location.pathname === "/projects") {
    return <Typography className={classes.title}>PROJECTS</Typography>;
  }
  if (location.pathname === "/tasks") {
    return <Typography className={classes.title}>TASKS</Typography>;
  }
  if (location.pathname === "/reports") {
    return <Typography className={classes.title}>REPORTS</Typography>;
  }
};

export default HeaderTitle;

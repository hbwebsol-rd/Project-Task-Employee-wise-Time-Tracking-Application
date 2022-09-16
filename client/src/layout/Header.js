import { Avatar, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "../views/view-css";
import HeaderTitle from "../components/HeaderTitle";
import { Link, useNavigate } from "react-router-dom";
import ConfirmLogout from "../components/ConfirmLogout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(HTMLElement > null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.headerRoot}>
      <ConfirmLogout open={open} setOpen={setOpen} classes={classes} />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <HeaderTitle classes={classes} />
        </Grid>
        <div className={classes.headerIcons}>
          <Grid item>
            <Link to="#">
              <NotificationsNoneIcon className={classes.headerIcon} />
            </Link>
          </Grid>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{}}
            aria-controls={openMenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              sx={{ color: "#A9A3A3" }}
              onClick={() => navigate("/profile")}
            >
              <PermIdentityIcon sx={{ marginRight: "10px" }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => setOpen(true)} sx={{ color: "#A9A3A3" }}>
              <LogoutIcon sx={{ marginRight: "10px" }} /> Logout
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </div>
  );
};

export default Header;

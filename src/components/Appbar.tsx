import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  IconButton,
  Box,
  Button,
  Toolbar,
  Typography,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import nore from "../assets/nore3.png";

export default function Appbar() {
  /* Handle Function */
  //Profile
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenProfile = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseProfile = () => setAnchorEl(null);
  //Client
  const [anchorCl, setAnchorCl] = useState(null);
  const openClient = Boolean(anchorCl);
  const handleOpenClient = (event: any) => setAnchorCl(event.currentTarget);
  const handleCloseClient = () => setAnchorCl(null);
  //Project
  const [anchorPr, setAnchorPr] = useState(null);
  const openProject = Boolean(anchorPr);
  const handleOpenProject = (event: any) => setAnchorPr(event.currentTarget);
  const handleCloseProject = () => setAnchorPr(null);

  const { auth, setAuth } = useAuth();
  const nama = auth?.nama;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosPrivate.delete("/auth/logout");
      setAuth("");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img src={nore} style={{ height: "40px", width: "160px" }} />
            </Link>
            <Box sx={{ display: "flex", ml: 2 }}>
              {auth?.role?.id === 1 || auth?.role?.id === 2 ? (
                <Button
                  onClick={handleOpenProject}
                  sx={{ color: "white" }}
                  size="large"
                  endIcon={
                    openProject ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  }
                >
                  Project
                </Button>
              ) : (
                <Button size="large">
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Project
                  </NavLink>
                </Button>
              )}

              {auth?.role?.id === 1 && (
                <>
                  <Button
                    onClick={handleOpenClient}
                    sx={{ color: "white" }}
                    size="large"
                    endIcon={
                      openClient ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                  >
                    Client
                  </Button>
                  <Button size="large">
                    <NavLink
                      to="/user"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      User
                    </NavLink>
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <IconButton onClick={handleOpenProfile}>
            <Avatar>
              {nama?.split(" ").length > 1
                ? `${nama?.split(" ")[0][0]}${nama?.split(" ")[1][0]}`
                : `${nama?.split(" ")[0][0]}`}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Menu  */}
      <Menu
        open={openMenu}
        onClose={handleCloseProfile}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
          <Avatar sx={{ mr: 2 }}>
            {nama?.split(" ").length > 1
              ? `${nama?.split(" ")[0][0]}${nama?.split(" ")[1][0]}`
              : `${nama?.split(" ")[0][0]}`}
          </Avatar>
          <Typography>{nama}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <NavLink
          to={`/profile`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout} color="#000000">
          Logout
        </MenuItem>
      </Menu>

      {/* Client Menu */}
      <Menu
        open={openClient}
        onClose={handleCloseClient}
        anchorEl={anchorCl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <NavLink
          to="/client"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem>Client List</MenuItem>
        </NavLink>
        <MenuItem>
          <NavLink
            to="/create-client"
            style={{ textDecoration: "none", color: "black" }}
          >
            Add Client
          </NavLink>
        </MenuItem>
      </Menu>

      {/* Project Menu */}
      <Menu
        open={openProject}
        onClose={handleCloseProject}
        anchorEl={anchorPr}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem>Project List</MenuItem>
        </NavLink>
        {(auth?.role?.id === 1 || auth?.role?.id === 2) && (
          <NavLink
            to="/create-project"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Add Project</MenuItem>
          </NavLink>
        )}
      </Menu>
    </>
  );
}

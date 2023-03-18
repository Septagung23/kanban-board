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
import MenuIcon from "@mui/icons-material/Menu";

import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import nore from "../assets/nore_w.png";

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
  //BOX SX
  const [anchorElNav, setAnchorElNav] = useState(null);
  const openMenuNav = Boolean(anchorElNav);
  const handleOpenMenu = (event: any) => setAnchorElNav(event.currentTarget);
  const handleCloseMenuNav = () => setAnchorElNav(null);

  const { auth, setAuth } = useAuth();
  const nama = auth?.nama;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosPrivate.delete("/auth/logout");
      setAuth("");
      navigate("/login");
    } catch (error) {}
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#3eb772" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* BOX MD */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={nore} style={{ width: "100px" }} />
              <span
                style={{
                  color: "#f5f5f5",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Task
              </span>
            </Link>
            <Box sx={{ display: "flex", ml: 2, mt: 1 }}>
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

          {/* BOX SX */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              sx={{ mt: 0.5 }}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>

            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={nore} style={{ width: "100px" }} />
              <span
                style={{
                  color: "#f5f5f5",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Task
              </span>
            </Link>

            <Menu
              open={openMenuNav}
              onClose={handleCloseMenuNav}
              anchorEl={anchorElNav}
              sx={{
                display: { xs: "block", md: "none", minWidth: "14rem" },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Project List</MenuItem>
              </NavLink>
              <NavLink
                to="/create-project"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Add Project</MenuItem>
              </NavLink>
              <NavLink
                to="/client"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Client List</MenuItem>
              </NavLink>
              <NavLink
                to="/create-client"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Add Client</MenuItem>
              </NavLink>
              <NavLink
                to="/user"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>User</MenuItem>
              </NavLink>
            </Menu>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mx: 1,
            pt: 1,
            minWidth: "11rem",
          }}
        >
          <Avatar sx={{ mr: 1.5 }}>
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
        <NavLink
          to="/create-client"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem>Add Client</MenuItem>
        </NavLink>
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
        <Box>
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
        </Box>
      </Menu>
    </>
  );
}

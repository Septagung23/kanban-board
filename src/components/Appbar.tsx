import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  Box,
  Button,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PeopleIcon from "@mui/icons-material/People";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";

import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Appbar() {
  /* Handle Function */
  //Drawer
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawerOpen = () => setOpen(true);
  const toggleDrawerClose = () => setOpen(false);
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
  const nama = auth?.username;
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              aria-label="open drawer"
              sx={{ color: "#ffffff" }}
              onClick={toggleDrawerOpen}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <Typography sx={{ ml: 1 }} variant="h5">
              Nore Task
            </Typography>

            <Box sx={{ display: "flex", ml: 2, mt: "5px" }}>
              <Button onClick={handleOpenProject} sx={{ color: "white" }}>
                Project
                {openProject ? (
                  <ExpandLessIcon sx={{ ml: 1 }} />
                ) : (
                  <ExpandMoreIcon sx={{ ml: 1 }} />
                )}
              </Button>

              {auth?.role?.id === 1 && (
                <>
                  <Button onClick={handleOpenClient} sx={{ color: "white" }}>
                    Client
                    {openClient ? (
                      <ExpandLessIcon sx={{ ml: 1 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ ml: 1 }} />
                    )}
                  </Button>
                  <Button>
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
              {nama.split(" ").length > 1
                ? `${nama.split(" ")[0][0]}${nama.split(" ")[1][0]}`
                : `${nama.split(" ")[0][0]}`}
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
            {nama.split(" ").length > 1
              ? `${nama.split(" ")[0][0]}${nama.split(" ")[1][0]}`
              : `${nama.split(" ")[0][0]}`}
          </Avatar>
          <Typography>{auth?.username}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem>
          <NavLink
            to={`/profile`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </NavLink>
        </MenuItem>
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
        <MenuItem>
          <NavLink
            to="/client"
            style={{ textDecoration: "none", color: "black" }}
          >
            Client List
          </NavLink>
        </MenuItem>
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
        <MenuItem>
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            Project List
          </NavLink>
        </MenuItem>
        {(auth?.role?.id === 1 || auth?.role?.id === 2) && (
          <MenuItem>
            <NavLink
              to="/create-project"
              style={{ textDecoration: "none", color: "black" }}
            >
              Add Project
            </NavLink>
          </MenuItem>
        )}
      </Menu>

      {/* Drawer */}
      <Drawer
        PaperProps={{
          sx: { width: "20%" },
        }}
        anchor="left"
        variant="temporary"
        open={open}
        onClose={toggleDrawerClose}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <IconButton onClick={toggleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

{
  /* 
          <NavLink
            to={`/profile`}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <Box sx={{ display: "block", textAlign: "center" }}>
              <AccountCircleRoundedIcon sx={{ fontSize: 80 }} />
              <Typography>Welcome Back, {auth?.username} !</Typography>
            </Box>
          </NavLink>
          <Divider />

          <Box>
            <List>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <ViewKanbanIcon sx={{ mr: 2 }} />
                      <Typography>Dashboard</Typography>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <Divider variant="middle" />
              {auth?.role?.id === 1 ? (
                <>
                  <NavLink to="/client" style={{ textDecoration: "none" }}>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <PeopleIcon sx={{ mr: 2 }} />
                          <Typography>Client</Typography>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                  <Divider variant="middle" />

                  <NavLink to="/user" style={{ textDecoration: "none" }}>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupsIcon sx={{ mr: 2 }} />
                          <Typography>User</Typography>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                  <Divider variant="middle" />
                </>
              ) : null}
            </List>
          </Box>
           */
}

{
  /* <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleLogout}
            >
            <LogoutIcon />
            Logout
          </Button> */
}

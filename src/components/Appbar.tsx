import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  AppBar,
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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PeopleIcon from "@mui/icons-material/People";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import LogoutIcon from "@mui/icons-material/Logout";

import axios from "../services/axios";
import { useAuth } from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Appbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefreshToken();

  const toggleDrawerOpen = () => {
    setOpen(true);
  };
  const toggleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.delete("/auth/logout");
      // setAuth({ accessToken: "" });
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          aria-label="open drawer"
          sx={{ color: "#ffffff" }}
          onClick={toggleDrawerOpen}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography sx={{ ml: 2 }}>Task</Typography>
        <div>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ m: 2 }}
            onClick={handleLogout}
          >
            <LogoutIcon />
            Logout
          </Button>
          <Button
            onClick={() => refresh()}
            color="secondary"
            variant="contained"
            size="small"
          >
            Refresh
          </Button>
        </div>
        {/* Drawer */}
        <Drawer
          PaperProps={{
            sx: { width: "20%" },
          }}
          anchor="left"
          variant="temporary"
          open={open}
          onClose={toggleDrawerClose}
          // sx={{ width: "auto" }}
        >
          <Box>
            {/* Close Drawer */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
              <IconButton onClick={toggleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />

            {/* Brief Profile */}
            <Box sx={{ display: "block", textAlign: "center" }}>
              <AccountCircleRoundedIcon sx={{ fontSize: 80 }} />
              <Typography>Welcome Back, Admin !</Typography>
            </Box>
            <Divider />

            {/* List Menu */}
            <Box>
              <List>
                {/* Home */}
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

                {/* Add Task   */}
                {/* <ListItem>
                  <NavLink to="/create-task" style={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddTaskIcon sx={{ mr: 2 }} />
                        <Typography>Add Task</Typography>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
                <Divider variant="middle" /> */}

                {/* Client */}
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
              </List>
            </Box>

            {/* Button Logout */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            ></Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

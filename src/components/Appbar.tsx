import { useState } from "react";
import { NavLink } from "react-router-dom";

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
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PeopleIcon from "@mui/icons-material/People";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";

export default function Appbar() {
  const [open, setOpen] = useState<boolean>(false);

  // const [openProject, setOpenProject] = useState<boolean>(false);
  // const handleOpenProject = () => {
  //   setOpenProject(!openProject);
  // };

  const toggleDrawerOpen = () => {
    setOpen(true);
  };
  const toggleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton
          edge="start"
          aria-label="open drawer"
          sx={{ color: "#ffffff" }}
          onClick={toggleDrawerOpen}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography sx={{ ml: 2 }}>Task</Typography>
        {/* Drawer */}
        <Drawer
          PaperProps={{
            sx: { width: "20%" },
          }}
          anchor="left"
          variant="temporary"
          open={open}
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
                <ListItem>
                  <NavLink to="/" style={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ViewKanbanIcon sx={{ mr: 2 }} />
                        <Typography>Dashboard</Typography>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
                <Divider variant="middle" />

                {/* Add Task   */}
                <ListItem>
                  <NavLink to="/create-task" style={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddTaskIcon sx={{ mr: 2 }} />
                        <Typography>Add Task</Typography>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
                <Divider variant="middle" />

                {/* Client */}
                <ListItem>
                  <NavLink
                    to="/create-client"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <PeopleIcon sx={{ mr: 2 }} />
                        <Typography>Client</Typography>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
                <Divider variant="middle" />

                {/* Profile */}
                {/* <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon sx={{ mr: 2 }} />
                      <Typography>Profile</Typography>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem> 
        <Divider variant="middle" /> */}
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
            >
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="error" sx={{ m: 2 }}>
                  Logout
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

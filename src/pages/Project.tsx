import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <>
      <Appbar />
      <Box
        className="container"
        sx={{
          width: "100%",
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Project List</Typography>
        </Box>

        <Box
          sx={{
            alignSelf: "center",
            width: "80%",
            border: "1px solid black",
            borderRadius: 3,
            m: 4,
          }}
        >
          <List sx={{ p: 2 }}>
            <Link to="/board" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ListItemText primary="Project 1" />
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Box>
    </>
  );
}

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import Appbar from "../components/Appbar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";

export default function Project() {
  const [project, setProject] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getProject();
  }, []);
  const getProject = async () => {
    try {
      const res = await axiosPrivate.get("/project");
      setProject(res.data);
      console.log("GET SUCCESS");
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const deleteProject = async (id: string) => {
    try {
      await axiosPrivate.delete(`/client/${id}`);
      getProject();
    } catch (error: any) {
      console.log(error);
    }
  };

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
        {/* {project?.map((p: any) => {
          <h1>{p.nama}</h1>;
        })} */}
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Project List</Typography>
        </Box>

        <Box
          sx={{
            alignSelf: "center",
            width: "80%",
            border: "1px solid grey",
            borderRadius: 3,
            m: 4,
          }}
        >
          <Link to="/create-project" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ m: 1 }}>
              Add Project
            </Button>
          </Link>
          <Divider />
          {JSON.stringify(project.map((p: any) => p.nama))}
          <List sx={{ p: 2, gap: 1 }}>
            {/* {project?.map((pr: any) => { */}
            <ListItem sx={{ border: "1px solid black", borderRadius: 3, p: 0 }}>
              <Link
                to="/board"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemButton>
                  <ListItemText primary="{pr.nama}" />
                </ListItemButton>
              </Link>
              <Divider orientation="vertical" flexItem />
              <Link to="/edit-project">
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
              </Link>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            {/* })} */}
          </List>
        </Box>
      </Box>
    </>
  );
}

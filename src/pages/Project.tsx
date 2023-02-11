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
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";
import { main } from "../constant/styles";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";

export default function Project() {
  const [project, setProject] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/project");
      setProject(res.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await axiosPrivate.delete(`/project/${id}`);
      getProject();
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Appbar />
      <Box className="container" sx={main}>
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
          <List sx={{ p: 2, gap: 1 }}>
            {project?.map((pr: any) => (
              <ListItem
                sx={{ border: "1px solid black", borderRadius: 3, p: 0, mb: 1 }}
                key={pr.id}
              >
                <Link
                  to={`/board/${pr.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={pr.nama} />
                  </ListItemButton>
                </Link>
                {auth?.role?.id === 3 ? null : (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <Link to={`project/${pr.id}`}>
                      <IconButton>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Link>
                    <ModalDelete
                      id={pr.id}
                      nama={pr.nama}
                      deleteFunction={deleteProject}
                    />
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
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
          <Typography variant="h3">Project</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            m: 4,
          }}
        >
          {project?.map((pr: any) => (
            <Card
              sx={{
                m: 1,
                minWidth: 345,
                minHeight: 1,
                boxShadow: 3,
                borderRadius: 2,
              }}
              key={pr.id}
            >
              {auth?.role?.id === 3 ? null : (
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end", pb: 0 }}
                >
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
                </CardActions>
              )}
              <Divider />
              <Link
                to={`/board/${pr.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent sx={{ pt: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h4">{pr.nama}</Typography>
                    <Typography sx={{ color: "grey" }}>
                      {pr.jenisLayanan}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "grey" }}>
                    {pr?.client?.perusahaan
                      ? pr?.client?.perusahaan
                      : pr?.client?.nama}
                  </Typography>

                  <Box
                    sx={{
                      my: 2,
                      mr: 1,
                      maxWidth: 340,
                    }}
                  >
                    <Typography variant="body1">{pr.keterangan}</Typography>
                  </Box>
                </CardContent>
              </Link>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}

{
  /* <List sx={{ p: 2, gap: 1 }}>
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
          </List> */
}

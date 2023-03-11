import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  TextField,
  Snackbar,
  Alert,
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
import Nodata from "../components/Nodata";

export default function Project() {
  const [project, setProject] = useState<any>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/project");
      setProject(res.data.data);
    } catch (error: any) {
      setProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await axiosPrivate.delete(`/project/${id}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getProject();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  let projects;
  if (project) {
    projects = project
      ?.filter((p: any) => {
        return p.nama.toLowerCase().indexOf(query.toLowerCase()) === 0;
      })
      ?.map((pr: any) => (
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
      ));
  }

  return (
    <>
      <Appbar />

      <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
        <Alert
          variant="filled"
          color={isErr ? "error" : "success"}
          severity={isErr ? "error" : "success"}
        >
          {mess}
        </Alert>
      </Snackbar>

      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Project List</Typography>
        </Box>
        {!isLoading ? (
          project ? (
            <>
              <Box sx={{ mx: 6 }}>
                <TextField
                  autoComplete="off"
                  variant="standard"
                  label="Search Project"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  mx: 4,
                  my: 2,
                }}
              >
                {projects}
              </Box>
            </>
          ) : (
            <Nodata message="Tidak ada project yang ditemukan" />
          )
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
}

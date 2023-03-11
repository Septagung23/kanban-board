import {
  Box,
  Typography,
  Paper,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import { main } from "../constant/styles";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import Nodata from "../components/Nodata";

export default function Client() {
  const [client, setClient] = useState<any>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setClient(null);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const res = await axiosPrivate.delete(`/client/${id}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getClient();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  let clients;
  if (client) {
    clients = client
      ?.filter((c: any) => {
        return c.nama.toLowerCase().indexOf(query.toLowerCase()) === 0;
      })
      ?.map((cl: any) => (
        <TableRow key={cl.id}>
          <TableCell>{cl.nama}</TableCell>
          <TableCell align="center">
            {cl.perusahaan ? cl.perusahaan : "Perseorangan"}
          </TableCell>
          <TableCell align="center">{cl.nomorHp}</TableCell>
          <TableCell align="center">{cl.alamat ? cl.alamat : "-"}</TableCell>
          <TableCell align="center">
            <Link to={`/client/${cl.id}`}>
              <IconButton>
                <EditIcon color="primary" />
              </IconButton>
            </Link>
            <ModalDelete
              id={cl.id}
              nama={cl.nama}
              deleteFunction={deleteClient}
            />
          </TableCell>
        </TableRow>
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
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Client List</Typography>
        </Box>
        {!isLoading ? (
          client ? (
            <>
              <Box sx={{ mx: 5, mb: 1 }}>
                <TextField
                  autoComplete="off"
                  variant="standard"
                  label="Search Client"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Box>

              <Box
                className="tabel"
                sx={{ textAlign: "center", width: "95%", alignSelf: "center" }}
              >
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Perusahaan
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Nomor
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Alamat
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>{clients}</TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ) : (
            <Nodata message="Tidak ada client yang ditemukan" />
          )
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
}

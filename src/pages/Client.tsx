import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  Divider,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import ModalDetail from "../components/Detail/ModalDetailClient";
import Loading from "../components/Loading";
import { main } from "../constant/styles";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";

export default function Client() {
  const [client, setClient] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await axiosPrivate.delete(`/client/${id}`);
      getClient();
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
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Client List</Typography>
        </Box>

        <Box
          className="tabel"
          sx={{ textAlign: "center", width: "95%", alignSelf: "center" }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell align="center">Perusahaan</TableCell>
                  <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Alamat</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {client?.map((cl) => (
                  <TableRow>
                    <TableCell>{cl.nama}</TableCell>
                    <TableCell align="center">
                      {cl.perusahaan ? cl.perusahaan : "Perseorangan"}
                    </TableCell>
                    <TableCell align="center">{cl.nomor_hp}</TableCell>
                    <TableCell align="center">
                      {cl.alamat ? cl.alamat : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/client/${cl.id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <ModalDelete
                        id={cl.id}
                        nama={cl.nama}
                        deleteFunction={deleteClient}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

{
  /* <Box
  sx={{
    alignSelf: "center",
    width: "80%",
    border: "1px solid grey",
    borderRadius: 3,
    m: 4,
  }}
>
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Link to="/create-client" style={{ textDecoration: "none" }}>
      <Button variant="contained" sx={{ m: 1 }}>
        Add Client
      </Button>
    </Link>
  </Box>
  <Divider />
  <List sx={{ p: 2 }}>
    {client.map((c) => (
      <>
        <ListItem
          sx={{
            border: "1px solid grey",
            borderRadius: 3,
            mt: 1,
            p: 0,
          }}
          key={c.id}
        >
          <ModalDetail
            id={c.id}
            nama={c.nama}
            perusahaan={c.perusahaan}
            alamat={c.alamat}
            nomor={c.nomor_hp}
          />
          <Divider orientation="vertical" flexItem />
          <Link to={`/client/${c.id}`}>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </Link>
          <ModalDelete
            id={c.id}
            nama={c.nama}
            deleteFunction={deleteClient}
          />
        </ListItem>
      </>
    ))}
  </List>
</Box> */
}

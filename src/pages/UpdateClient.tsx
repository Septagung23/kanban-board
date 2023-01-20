import { Box, TextField, Button, Typography, FormControl } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

import Appbar from "../components/Appbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function UpdateClient() {
  const { id } = useParams();
  const [nama, setNama] = useState<string>("");
  const [perusahaan, setPerusahaan] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    getClientById();
  }, []);

  const getClientById = async () => {
    const res = await axiosPrivate.get(`/client/${id}`);
    console.log(res.data);
    setNama(res.data.nama);
    setPerusahaan(res.data.perusahaan);
    setAlamat(res.data.alamat);
    setNomor(res.data.nomor_hp);
  };

  const updateClient = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/client/${id}`, {
        nama,
        perusahaan,
        alamat,
        nomor_hp: nomor,
      });
      console.log(res);
      navigate("/client");
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
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <GroupsIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Edit Client</Typography>
        </Box>
        {/* Input */}
        <Box
          className="input"
          component="form"
          onSubmit={updateClient}
          sx={{ width: "80%", alignSelf: "center", my: 2, gap: 3 }}
        >
          <FormControl fullWidth>
            <Typography sx={{ my: 1 }}>Nama</Typography>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Nama"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
            />
            <Typography sx={{ my: 1 }}>Nomor Handphone</Typography>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Nomor"
              value={nomor}
              onChange={(event) => setNomor(event.target.value)}
            />

            <Typography sx={{ my: 1 }}>Perusahaan</Typography>
            <TextField
              id="outlined-required"
              label="Perusahaan"
              fullWidth
              value={perusahaan}
              onChange={(event) => setPerusahaan(event.target.value)}
            />
            <Typography sx={{ my: 1 }}>Alamat</Typography>
            <TextField
              fullWidth
              multiline
              id="outlined-required"
              label="Alamat"
              minRows={2}
              value={alamat}
              onChange={(event) => setAlamat(event.target.value)}
            />
            {/* Button */}
            <Box className="button" sx={{ my: 3, textAlign: "right" }}>
              <Link to="/client" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mr: 1 }} color="error">
                  Back
                </Button>
              </Link>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

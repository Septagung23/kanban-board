import { Box, TextField, Button, Typography } from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import Appbar from "../components/Appbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { main } from "../constant/styles";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

export default function CreateClient() {
  const [nama, setNama] = useState<string>("");
  const [perusahaan, setPerusahaan] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const createClient = async (e: any) => {
    e.preventDefault();
    try {
      await axiosPrivate.post("/client", {
        nama,
        perusahaan,
        alamat,
        nomorHp: nomor,
      });
      navigate("/client");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Appbar />
      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <PersonAddAlt1Icon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Tambah Client</Typography>
        </Box>

        <Box
          className="input"
          component="form"
          onSubmit={createClient}
          sx={{ width: "80%", alignSelf: "center", my: 2, gap: 3 }}
        >
          <TextField
            autoComplete="off"
            required
            fullWidth
            id="outlined-required"
            label="Nama"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
          />
          <TextField
            autoComplete="off"
            required
            id="outlined-required"
            label="Nomor"
            inputMode="numeric"
            fullWidth
            value={nomor}
            onChange={(event) => setNomor(event.target.value)}
          />

          <TextField
            autoComplete="off"
            id="outlined-required"
            label="Perusahaan (opsional)"
            fullWidth
            value={perusahaan}
            onChange={(event) => setPerusahaan(event.target.value)}
          />
          <TextField
            autoComplete="off"
            multiline
            id="outlined-required"
            label="Alamat (opsional)"
            fullWidth
            minRows={2}
            value={alamat}
            onChange={(event) => setAlamat(event.target.value)}
          />
          <div style={{ marginTop: 5, textAlign: "right" }}>
            <Link to="/client" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ mr: 1 }} color="error">
                Back
              </Button>
            </Link>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
}

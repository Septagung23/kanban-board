import { Box, TextField, Button, Typography } from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import Appbar from "../components/Appbar";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function CreateClient() {
  const [nama, setNama] = useState<string>("");
  const [perusahaan, setPerusahaan] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const createClient = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post("/client", {
        nama,
        perusahaan,
        alamat,
        nomor_hp: nomor,
      });
      goBack();
      console.log(res);
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
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
          <PersonAddAlt1Icon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Tambah Client</Typography>
        </Box>
        {/* Input */}
        <Box
          className="input"
          component="form"
          onSubmit={createClient}
          sx={{ width: "80%", alignSelf: "center", my: 2, gap: 3 }}
        >
          <Typography sx={{ my: 1 }}>Nama</Typography>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Nama"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
          />
          <Typography sx={{ my: 1 }}>Nomor Handphone</Typography>
          <TextField
            required
            id="outlined-required"
            label="Nomor"
            fullWidth
            value={nomor}
            onChange={(event) => setNomor(event.target.value)}
          />

          <Typography sx={{ mt: 1 }}>Perusahaan</Typography>
          <TextField
            id="outlined-required"
            label="Perusahaan"
            fullWidth
            value={perusahaan}
            onChange={(event) => setPerusahaan(event.target.value)}
          />
          <Typography sx={{ my: 1 }}>Alamat</Typography>
          <TextField
            multiline
            id="outlined-required"
            label="Alamat"
            fullWidth
            minRows={2}
            value={alamat}
            onChange={(event) => setAlamat(event.target.value)}
          />
          <div style={{ marginTop: 5, textAlign: "right" }}>
            {/* Button */}
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              color="error"
              onClick={goBack}
            >
              Back
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
}

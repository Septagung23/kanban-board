import { Box, TextField, Button, Typography, FormControl } from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";

import Appbar from "../components/Appbar";
import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { main } from "../constant/styles";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UpdateClient() {
  const { id } = useParams();
  const [nama, setNama] = useState<string>("");
  const [perusahaan, setPerusahaan] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    getClientById();
  }, []);

  const getClientById = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/client/${id}`);
      setNama(res.data.nama);
      setPerusahaan(res.data.perusahaan);
      setAlamat(res.data.alamat);
      setNomor(res.data.nomorHp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateClient = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/client/${id}`, {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Appbar />
      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <GroupsIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Edit Client</Typography>
        </Box>
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
              inputMode="numeric"
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

import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";

import Appbar from "../components/Appbar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { main } from "../constant/styles";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateProject() {
  const [client, setClient] = useState([]);
  const [clientId, setClientId] = useState(client.id);
  const [clientNama, setClientNama] = useState(client.nama);
  const [nama, setNama] = useState("");
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const options = client?.map((cl) => ({ label: cl.nama, id: cl.id }));

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (event) => {
    event.preventDefault();
    try {
      await axiosPrivate.post("/project", {
        nama,
        clientId,
        jenisLayanan,
        keterangan,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Appbar />
      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <AddIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Tambah Project</Typography>
        </Box>

        <Box
          className="input"
          component="form"
          onSubmit={createProject}
          sx={{ width: "80%", alignSelf: "center", my: 3, gap: 3 }}
        >
          <FormControl fullWidth>
            <Typography variant="h5" sx={{ my: 1 }}>
              Nama Project
            </Typography>
            <TextField
              autoComplete="off"
              required
              id="outlined-required"
              label="Nama"
              fullWidth
              value={nama}
              onChange={(event) => setNama(event.target.value)}
            />

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                Client
              </Typography>
              <Autocomplete
                required
                disablePortal
                id="Client"
                sx={{ width: 300, mx: 3 }}
                options={options}
                value={clientNama}
                onChange={(event, values) => {
                  setClientId(values.id);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Client" />
                )}
              />
              <Typography variant="h5" sx={{ my: 1, mx: 3 }}>
                Jenis Layanan
              </Typography>
              <FormControl sx={{ width: 300, mt: 1 }}>
                <InputLabel id="demo-simple-select-label">Layanan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Layanan"
                  value={jenisLayanan}
                  onChange={(event) => setJenisLayanan(event.target.value)}
                >
                  <MenuItem value="Langganan">Langganan</MenuItem>
                  <MenuItem value="Lepas">Lepas</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography variant="h5" sx={{ mb: 1 }}>
              Keterangan
            </Typography>
            <TextField
              autoComplete="off"
              fullWidth
              id="outlined-multiline-flexible"
              label="Keterangan"
              multiline
              rows={5}
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
            />
            <Box className="button" sx={{ my: 3, textAlign: "right" }}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mr: 1 }} color="error">
                  Back
                </Button>
              </NavLink>
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

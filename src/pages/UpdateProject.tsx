import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import Appbar from "../components/Appbar";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "../components/Loading";
import { main } from "../constant/styles";

export default function UpdateProject() {
  const { id } = useParams();
  const [client, setClient] = useState<any>([]);
  const [clientId, setClientId] = useState(client.id);
  const [clientNama, setClientNama] = useState(client.nama);
  const [nama, setNama] = useState("");
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const options = client?.map((cl: any) => ({ label: cl.nama, id: cl.id }));

  const getClient = async () => {
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectById = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get(`/project/${id}`);
      setNama(res.data.nama);
      setClientId(res.data.client.id);
      setClientNama(res.data.client.nama);
      setJenisLayanan(res.data.jenisLayanan);
      setKeterangan(res.data.keterangan);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectById();
    getClient();
  }, []);

  const updateProject = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.patch(`project/${id}`, {
        nama,
        clientId,
        jenisLayanan,
        keterangan,
      });
      navigate("/");
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
          <AddIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Edit Project</Typography>
        </Box>

        <Box
          className="input"
          component="form"
          sx={{ width: "80%", alignSelf: "center", my: 3, gap: 3 }}
          onSubmit={updateProject}
        >
          <FormControl fullWidth>
            <Typography variant="h5" sx={{ my: 1 }}>
              Nama Project
            </Typography>
            <TextField
              required
              fullWidth
              id="namaProject"
              label="Nama"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
            />
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                Client
              </Typography>
              <Autocomplete
                disablePortal
                id="Client"
                sx={{ width: 300, mx: 3 }}
                options={options}
                value={clientNama}
                onChange={(event, values) => {
                  setClientId(values.id);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={clientNama} />
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
              fullWidth
              id="outlined-multiline-flexible"
              label="Keterangan"
              multiline
              rows={5}
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
            />
            {/* Button */}
            <Box className="button" sx={{ my: 3, textAlign: "right" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
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

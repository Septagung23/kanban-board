import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Modal,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { useState, useEffect } from "react";

import { modal } from "../../constant/styles";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UpdateProfile(props: any) {
  const axiosPrivate = useAxiosPrivate();
  //State
  const [nama, setNama] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const [divisi, setDivisi] = useState<string>("");
  const getProfile = props.getProfile;

  //Axios Fetch
  const getOwnProfile = async () => {
    try {
      const res = await axiosPrivate.get(`/user/me`);
      const data = res.data;
      setNama(data.nama_lengkap);
      setUsername(data.username);
      setNomor(data.nomor_hp);
      setDivisi(data.divisi);
    } catch (error: any) {
      console.log(error);
    }
  };

  const UpdateProfile = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/user/${props.profile?.id}`, {
        nama_lengkap: nama,
        username,
        nomor_hp: nomor,
        divisi,
      });
      console.log(res);
      getProfile();
      props.close();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnProfile();
    getProfile();
  }, []);

  return (
    <>
      <Modal open={props.open} onClose={props.close}>
        <Box sx={modal} component="form" onSubmit={UpdateProfile}>
          <Typography variant="h4">Edit Profile</Typography>
          <Divider />
          <Typography sx={{ textAlign: "left", my: 1 }}>
            Nama Lengkap
          </Typography>
          <TextField
            required
            id="outlined-r-nama"
            label="Nama"
            fullWidth
            value={nama}
            onChange={(event) => setNama(event.target.value)}
          />
          <Typography sx={{ textAlign: "left", my: 1 }}>Username</Typography>
          <TextField
            required
            id="outlined-r-username"
            label="Username"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Typography sx={{ textAlign: "left", my: 1 }}>Nomor HP</Typography>
          <TextField
            required
            id="outlined-r-nomor"
            label="Nomor"
            fullWidth
            value={nomor}
            onChange={(event) => setNomor(event.target.value)}
          />
          <Typography sx={{ textAlign: "left", my: 1 }}>Divisi</Typography>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Divisi</InputLabel>
            <Select
              id="divisi"
              label="divisi"
              value={divisi}
              onChange={(event: any) => setDivisi(event.target.value)}
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Wordpress">Wordpress</MenuItem>
              <MenuItem value="Project Manager">Project Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" sx={{ mt: 1 }} type="submit">
            Submit
          </Button>
          <Button color="error" onClick={props.close}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

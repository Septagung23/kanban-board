import {
  Alert,
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
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

  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  //Axios Fetch
  const UpdateProfile = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/user/${props.profile?.id}`, {
        namaLengkap: nama,
        username,
        nomorHp: nomor,
        divisi,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.close();
      getProfile();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  useEffect(() => {
    setNama(props.profile.namaLengkap);
    setUsername(props.profile.username);
    setNomor(props.profile.nomorHp);
    setDivisi(props.profile.divisi);
  }, [props.open]);

  return (
    <>
      <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
        <Alert
          variant="filled"
          color={isErr ? "error" : "success"}
          severity={isErr ? "error" : "success"}
        >
          {mess}
        </Alert>
      </Snackbar>
      <Modal open={props.open} onClose={props.close}>
        <Box sx={modal} component="form" onSubmit={UpdateProfile}>
          <Typography variant="h4">Edit Profile</Typography>
          <Divider sx={{ mb: 3 }} />
          <TextField
            autoComplete="off"
            required
            id="outlined-r-nama"
            label="Nama"
            fullWidth
            value={nama}
            onChange={(event) => setNama(event.target.value)}
          />
          <TextField
            autoComplete="off"
            required
            id="outlined-r-username"
            label="Username"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            autoComplete="off"
            required
            id="outlined-r-nomor"
            label="Nomor"
            fullWidth
            value={nomor}
            onChange={(event) => setNomor(event.target.value)}
          />
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
          <Button
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: "#3eb772",
              "&:hover": {
                backgroundColor: "#3eb772",
              },
            }}
            type="submit"
          >
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

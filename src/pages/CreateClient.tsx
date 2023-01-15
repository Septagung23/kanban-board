import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Appbar from "../components/Appbar";
import { NavLink } from "react-router-dom";

export default function CreateClient() {
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
          sx={{ width: "80%", alignSelf: "center", my: 2, gap: 3 }}
        >
          <FormControl fullWidth>
            <Typography sx={{ my: 1 }}>Nama</Typography>
            <TextField required id="outlined-required" label="Nama" fullWidth />
            <Typography sx={{ my: 1 }}>Nomor Handphone</Typography>
            <TextField
              required
              id="outlined-required"
              label="Nomor"
              fullWidth
            />

            <Typography sx={{ my: 1 }}>Perusahaan</Typography>
            <TextField id="outlined-required" label="Perusahaan" fullWidth />
            <Typography sx={{ my: 1 }}>Alamat</Typography>
            <TextField
              multiline
              id="outlined-required"
              label="Alamat"
              fullWidth
              minRows={2}
            />
            {/* Button */}
            <Box className="button" sx={{ my: 3, textAlign: "right" }}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mr: 1 }} color="error">
                  Back
                </Button>
              </NavLink>
              <Button variant="contained">Submit</Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}

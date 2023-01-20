import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import Appbar from "../components/Appbar";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";

export default function UpdateProject() {
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
        <Box className="judul" sx={{ textAlign: "center" }}>
          <AddIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Edit Project</Typography>
        </Box>

        <Box
          className="input"
          component="form"
          sx={{ width: "80%", alignSelf: "center", my: 3, gap: 3 }}
        >
          <FormControl fullWidth>
            <Typography variant="h5" sx={{ my: 1 }}>
              Nama Project
            </Typography>
            <TextField required id="outlined-required" label="Nama" fullWidth />
            <Box sx={{ display: "flex", my: 2 }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                Client
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300, mx: 3 }}
                renderInput={(params) => (
                  <TextField {...params} label="Client" />
                )}
              />
              <Typography variant="h5" sx={{ my: 1, mx: 3 }}>
                Jenis Langganan
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Langganan"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Langganan"
                  control={<Radio />}
                  label="Langganan"
                />
                <FormControlLabel
                  value="Lepas"
                  control={<Radio />}
                  label="Lepas"
                />
              </RadioGroup>
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

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];

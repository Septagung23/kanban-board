import {
  TextField,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [open, setOpen] = useState<boolean>(false);
  const handleShowPassword = () => setOpen((show) => !show);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        background:
          "linear-gradient(51deg, rgba(0,255,3,1) 0%, rgba(3,184,5,1) 35%, rgba(1,168,3,1) 50%, rgba(3,184,5,1) 65%, rgba(0,255,3,1) 100%)",
      }}
    >
      {/* Container */}
      <Box
        className="containerRegister"
        sx={{
          width: "40%",
          display: "flex",
          my: 5,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.10)",
          position: "fixed",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Register */}
        <Box
          className="Register"
          sx={{
            width: "100%",
            borderRadius: "16px",
            color: "rgba(254, 250,224)",
            m: 1,
          }}
        >
          <PersonAddAlt1OutlinedIcon sx={{ mt: 1, fontSize: "40px" }} />
          <Typography variant="h5">Register</Typography>
          {/* Form */}
          <Box
            className="registerForm"
            component="form"
            sx={{
              width: "auto",
              mx: 4,
              mt: 3,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography sx={{ textAlign: "left" }}>Nama Lengkap</Typography>
            <TextField required id="outlined-required" label="Nama Lengkap" />
            <Typography sx={{ textAlign: "left" }}>Nomor HP</Typography>
            <TextField required id="outlined-required" label="Nomor" />
            <Typography sx={{ textAlign: "left" }}>Username</Typography>
            <TextField required id="outlined-required" label="Username" />
            <Typography sx={{ textAlign: "left" }}>Password</Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={open ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Button
            type="submit"
            sx={{ mt: 2, mb: 1 }}
            variant="contained"
            color="primary"
            size="medium"
          >
            Register
          </Button>
          {/* END Button Login */}
          <Divider sx={{ my: 1 }} />
          {/* Register */}
          <Typography variant="body1">
            Already Have an Account
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{ mb: 0.1, color: "rgba(254, 250,224)" }}
                color="primary"
                size="small"
              >
                Login
              </Button>
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

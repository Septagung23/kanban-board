import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { api } from "../constant/constant";

export default function Login() {
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  console.log(formData);

  const [open, setOpen] = useState<boolean>(false);
  const handleShowPassword = () => setOpen((show) => !show);

  const login = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${api}/auth/login`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      {/* Box Container Login */}
      <Box
        className="containerLogin"
        sx={{
          width: "40%",
          display: "flex",
          my: 5,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          position: "fixed",
          // backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Box Login */}
        <Box
          className="Login"
          sx={{
            width: "100%",
            borderRadius: "16px",
            color: "rgba(254, 250,224)",
            // background: "rgba(254, 250,224)",
            m: 1,
          }}
        >
          <LockIcon sx={{ mt: 3, fontSize: "40px" }} />
          <Typography variant="h3">Login</Typography>
          {/* Box Textfield */}
          <Box
            className="loginForm"
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
            <Typography sx={{ textAlign: "left" }}>Username</Typography>
            <TextField
              required
              id="outlined-required"
              label="Username"
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              value={formData.username}
            />
            <Typography sx={{ textAlign: "left", mt: 2 }}>Password</Typography>
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
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
                value={formData.password}
              />
            </FormControl>
          </Box>
          {/* END Box Textfield */}

          {/* Button Login */}
          <Button
            type="submit"
            sx={{ mt: 3, mb: 1 }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={login}
          >
            Login
          </Button>
          {/* END Button Login */}

          <Divider sx={{ my: 1 }} />
          {/* Register */}
          <Typography variant="body1">
            Doesn't Have an Account ?
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <Button
                sx={{ mb: 0.1, color: "rgba(254, 250,224)" }}
                color="primary"
                size="small"
              >
                Register
              </Button>
            </NavLink>
          </Typography>
          {/* END Register */}
        </Box>
        {/* END Box Login */}
      </Box>
      {/* END Box Container Login */}
    </Box>
  );
}

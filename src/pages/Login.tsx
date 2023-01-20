import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormLabel,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "../services/axios";

export default function Login() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const handleShowPassword = () => setOpen((show) => !show);
  const navigate = useNavigate();

  const login = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = response.data.accessToken;
      const username = response.data.username;
      const role = response.data.role;
      console.log(response.data);
      setAuth({ accessToken, username, role });
      navigate("/");
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
            onSubmit={login}
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
            <FormLabel htmlFor="username">
              <Typography
                sx={{ textAlign: "left", color: "rgba(254, 250,224)" }}
              >
                Username
              </Typography>
            </FormLabel>
            <TextField
              required
              id="username"
              label="Username"
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              value={formData.username}
            />
            <FormLabel htmlFor="password">
              <Typography
                sx={{ textAlign: "left", mt: 2, color: "rgba(254, 250,224)" }}
              >
                Password
              </Typography>
            </FormLabel>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
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
            {/* Button Login */}
            <Button
              type="submit"
              sx={{ mt: 3, mb: 1 }}
              variant="contained"
              color="primary"
              size="medium"
            >
              Login
            </Button>
            {/* END Button Login */}
          </Box>
          {/* END Box Textfield */}

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

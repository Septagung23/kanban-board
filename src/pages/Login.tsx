import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Alert,
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

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "../components/Loading";
import nore from "../assets/nore_w.png";

export default function Login() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleShowPassword = () => setOpen((show) => !show);
  const navigate = useNavigate();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const axiosPrivate = useAxiosPrivate();

  const login = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post(`/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const id = response.data.id;
      const nama = response.data.namaLengkap;
      const token = response.data.accessToken;
      const role = response.data.role;
      setAuth({ token, id, nama, role });
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setErrMsg("Unauthorized - Password/Username Salah");
      }
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
      <Box
        className="containerLogin"
        sx={{
          width: "40%",
          display: "flex",
          my: 5,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          position: "fixed",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          className="Login"
          sx={{
            width: "100%",
            borderRadius: "16px",
            color: "rgba(255, 255,255)",
            m: 1,
          }}
        >
          <img src={nore} style={{ height: "60px", width: "100px" }} />
          <Typography variant="h3">Login</Typography>
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
            {errMsg && (
              <Alert severity="error" variant="filled">
                {errMsg}
              </Alert>
            )}

            <FormLabel htmlFor="username">
              <Typography sx={{ textAlign: "left", color: "white" }}>
                Username
              </Typography>
            </FormLabel>
            <TextField
              autoComplete="off"
              required
              id="username"
              label="Username"
              inputProps={{
                readOnly: readOnly,
              }}
              onFocus={() => setReadOnly(false)}
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              value={formData.username}
            />

            <FormLabel htmlFor="password">
              <Typography sx={{ textAlign: "left", mt: 2, color: "white" }}>
                Password
              </Typography>
            </FormLabel>
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                autoComplete="off"
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
                inputProps={{
                  readOnly: readOnly,
                }}
                onFocus={() => setReadOnly(false)}
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
          </Box>

          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            Doesn't Have an Account ?
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  mb: 0.1,
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="body1">Register</Typography>
              </Button>
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

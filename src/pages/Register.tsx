import {
  TextField,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Divider,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Register() {
  const [open, setOpen] = useState<boolean>(false);
  const handleShowPassword = () => setOpen((show) => !show);

  const [formRegister, setFormRegister] = useState<any>({
    namaLengkap: "",
    username: "",
    password: "",
    nomorHp: "",
    divisi: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState<any>();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (formRegister.password !== passwordConfirm) {
      return;
    }

    try {
      const response = await axiosPrivate.post(`/auth/register`, formRegister);
      navigate("/login");
      setIsLoading(false);
    } catch (error: any) {
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
        className="containerRegister"
        sx={{
          width: "40%",
          display: "flex",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.10)",
          position: "fixed",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          className="Register"
          sx={{
            width: "100%",
            borderRadius: "16px",
            color: "rgba(254, 250,224)",
            m: 1,
          }}
        >
          <PersonAddAlt1OutlinedIcon sx={{ fontSize: "40px" }} />
          <Typography variant="h5">Register</Typography>

          <Box
            className="registerForm"
            component="form"
            sx={{
              width: "auto",
              mx: 4,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ textAlign: "left" }}>Nama Lengkap</Typography>
            <TextField
              required
              id="outlined-r-nama"
              label="Nama Lengkap"
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  namaLengkap: event.target.value,
                })
              }
            />
            <Typography sx={{ textAlign: "left" }}>Nomor HP</Typography>
            <TextField
              required
              id="outlined-r-nomor"
              label="Nomor"
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  nomorHp: event.target.value,
                })
              }
            />
            <Typography sx={{ textAlign: "left" }}>Username</Typography>
            <TextField
              required
              id="registerUsername"
              label="Username"
              onChange={(event) =>
                setFormRegister({
                  ...formRegister,
                  username: event.target.value,
                })
              }
            />
            <Typography sx={{ textAlign: "left" }}>Password</Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="registerPassword">Password</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="registerPassword"
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
                  setFormRegister({
                    ...formRegister,
                    password: event.target.value,
                  })
                }
              />
            </FormControl>

            <Typography sx={{ textAlign: "left" }}>
              Konfirmasi Password
            </Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="registerConfirm-password">
                Konfirmasi
              </InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="registerConfirm-password"
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
                onChange={(event) => setPasswordConfirm(event.target.value)}
              />
            </FormControl>

            <Typography sx={{ textAlign: "left" }}>Divisi</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Divisi</InputLabel>
              <Select
                id="divisi"
                label="divisi"
                value={formRegister.divisi ? formRegister.divisi : ""}
                onChange={(event) =>
                  setFormRegister({
                    ...formRegister,
                    divisi: event.target.value,
                  })
                }
              >
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Wordpress">Wordpress</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              sx={{ mt: 2, mb: 1 }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={register}
            >
              Register
            </Button>
          </Box>

          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            Already Have an Account ?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  mb: 0.1,
                  color: "rgba(254, 250,224)",
                  textTransform: "capitalize",
                }}
                color="primary"
                size="small"
              >
                <Typography variant="body1">Login</Typography>
              </Button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

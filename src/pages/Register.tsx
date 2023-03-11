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
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  const register = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (formRegister.password !== passwordConfirm) {
      return;
    }

    try {
      await axiosPrivate.post(`/auth/register`, formRegister);
      navigate("/login");
      setIsLoading(false);
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
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
        backgroundColor: "#3eb772",
      }}
    >
      <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
        <Alert
          variant="filled"
          color={isErr ? "error" : "success"}
          severity={isErr ? "error" : "success"}
        >
          {mess}
        </Alert>
      </Snackbar>

      <Box
        className="containerRegister"
        sx={{
          display: "flex",
          borderRadius: 1,
          background: "#f5f5f5",
          position: "fixed",
          pb: 2,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          className="Register"
          sx={{
            width: "100%",
            borderRadius: "16px",
          }}
        >
          <PersonAddAlt1OutlinedIcon sx={{ fontSize: "40px" }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Register
          </Typography>
          <Box
            className="registerForm"
            component="form"
            sx={{
              mx: 4,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <Box display="flex" alignItems="flex-start">
              <TextField
                fullWidth
                size="small"
                autoComplete="off"
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
              <Tooltip title="Nama lengkap harus terdiri dari 1-60 karakter">
                <IconButton>
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" alignItems="flex-start">
              <TextField
                fullWidth
                size="small"
                autoComplete="off"
                required
                id="registerUsername"
                label="Username"
                inputProps={{
                  readOnly: readOnly,
                }}
                onFocus={() => setReadOnly(false)}
                onChange={(event) =>
                  setFormRegister({
                    ...formRegister,
                    username: event.target.value,
                  })
                }
              />
              <Tooltip title="Username harus terdiri dari 4-30 karakter dan hanya boleh menggunakan titik (.) dan underscore (_) sebagai karakter spesial">
                <IconButton>
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" alignItems="flex-start" mb="0.8rem">
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel htmlFor="registerPassword">Password * </InputLabel>
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
              <Tooltip title="Password harus terdiri dari 8-32 karakter">
                <IconButton>
                  <HelpOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box display="flex" alignItems="flex-start" mb="0.8rem">
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel htmlFor="registerConfirm-password">
                  Konfirmasi *
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
              <IconButton>
                {passwordConfirm ? (
                  formRegister.password === passwordConfirm ? (
                    <CheckCircleOutlinedIcon />
                  ) : (
                    <Tooltip title="Password dan konfirmasi password tidak sama">
                      <CancelOutlinedIcon />
                    </Tooltip>
                  )
                ) : (
                  <Tooltip title="Konfirmasi password harus diisi">
                    <ErrorOutlineIcon />
                  </Tooltip>
                )}
              </IconButton>
            </Box>

            <TextField
              fullWidth
              size="small"
              autoComplete="off"
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

            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Divisi * </InputLabel>
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
              sx={{
                mt: 2,
                mb: 1,
                bgcolor: "#3eb772",
                "&:hover": {
                  backgroundColor: "#3eb772",
                },
              }}
              className="Button"
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
            Already Have an Account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#3eb772" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

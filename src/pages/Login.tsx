import { Link, useNavigate } from "react-router-dom";
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
  Snackbar,
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "../components/Loading";
import nore from "../assets/nore.png";

export default function Login() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const [openErr, setOpenErr] = useState(false);
  const closeErr = () => setOpenErr(false);
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
      const res = await axiosPrivate.post(`/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const id = res.data.data.id;
      const nama = res.data.data.namaLengkap;
      const token = res.data.data.accessToken;
      const role = res.data.data.role;
      setAuth({ token, id, nama, role });
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      if (error?.response?.data?.code === 400) {
        setErrMsg(error?.response?.data?.message);
        setOpenErr(true);
      } else if (error?.response?.data?.code === 401) {
        setErrMsg("Username/Password Salah");
        setOpenErr(true);
      } else if (error?.response?.data?.code === 503) {
        setErrMsg(error?.response?.data?.message);
        setOpenErr(true);
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {errMsg && (
        <Snackbar open={openErr} autoHideDuration={3000} onClose={closeErr}>
          <Alert onClose={closeErr} severity="error" variant="filled">
            {errMsg}
          </Alert>
        </Snackbar>
      )}
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
        <Box
          className="containerLogin"
          sx={{
            display: "flex",
            my: 5,
            borderRadius: 1,
            background: "#f5f5f5",
            position: "fixed",
            pb: 1,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            className="Login"
            sx={{
              width: "100%",
              m: 1,
            }}
          >
            <img src={nore} style={{ width: "180px" }} />
            <Typography variant="h4">Login</Typography>
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
              <FormLabel htmlFor="username"></FormLabel>
              <TextField
                autoComplete="off"
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
              <FormControl variant="outlined">
                <InputLabel id="password-login">Password</InputLabel>
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
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  value={formData.password}
                  label="Password"
                />
              </FormControl>

              {/* Button Login */}
              <Button
                className="Button"
                type="submit"
                sx={{
                  mt: 3,
                  mb: 1,
                  bgcolor: "#3eb772",
                  "&:hover": {
                    backgroundColor: "#3eb772",
                  },
                }}
                variant="contained"
                color="primary"
                size="medium"
              >
                Login
              </Button>
            </Box>

            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">
              Doesn't Have an Account?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#3eb772" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

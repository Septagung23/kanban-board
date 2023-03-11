import {
  Box,
  IconButton,
  Button,
  Typography,
  Modal,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useState } from "react";

import { modal } from "../../constant/styles";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function ChangePass(props: any) {
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const handleShowPassword = () => setOpenPassword((show) => !show);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  const updatePassword = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch("user/change-password", {
        newPassword: password,
        confirmNewPassword: passwordConfirm,
        currentPassword,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.close();
      setOpenPassword(false);
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

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
        <Box sx={modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <Divider />
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
            component="form"
            onSubmit={updatePassword}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="passL">Password Lama</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="passL"
                type={openPassword ? "text" : "password"}
                label="Password Lama"
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel htmlFor="passN">Password Baru</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="passN"
                type={openPassword ? "text" : "password"}
                label="Password Baru"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>

            <FormControl variant="outlined" sx={{ mb: 0 }}>
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Konfirmasi
              </InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="outlined-adornment-confirm-password"
                type={openPassword ? "text" : "password"}
                label="Password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
              />
            </FormControl>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                Tampilkan Password
              </Typography>
              <IconButton
                aria-label="password"
                edge="end"
                onClick={handleShowPassword}
              >
                {openPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Box>

            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
            <Button color="error" onClick={props.close}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

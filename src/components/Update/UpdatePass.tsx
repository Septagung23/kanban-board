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

  const updatePassword = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch("user/change-password", {
        id: auth?.id,
        newPassword: password,
        confirmNewPassword: passwordConfirm,
        currentPassword,
      });
      console.log(res.data);
      props.close();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ textAlign: "left", my: 1 }}>
                Password Lama
              </Typography>
              <IconButton
                aria-label="password"
                edge="end"
                onClick={handleShowPassword}
                sx={{ px: 2 }}
              >
                {openPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Box>

            <FormControl variant="outlined">
              <InputLabel htmlFor="pass">Password</InputLabel>
              <OutlinedInput
                id="pass"
                type={openPassword ? "text" : "password"}
                label="Password"
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </FormControl>

            <Typography sx={{ textAlign: "left", my: 1 }}>
              Password Baru
            </Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="pass">Password</InputLabel>
              <OutlinedInput
                id="pass"
                type={openPassword ? "text" : "password"}
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>

            <Typography sx={{ textAlign: "left", my: 1 }}>
              Konfirmasi Password
            </Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Konfirmasi
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={openPassword ? "text" : "password"}
                label="Password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
              />
            </FormControl>

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

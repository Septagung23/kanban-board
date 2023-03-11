import Appbar from "../components/Appbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WorkIcon from "@mui/icons-material/Work";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";

import UpdateProfile from "../components/Update/UpdateProfile";
import ChangePass from "../components/Update/UpdatePass";

export default function Profile() {
  // State
  const [profile, setProfile] = useState<any>({});
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // Handle Function
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [openPass, setOpenPass] = useState(false);
  const handleOpenPass = () => {
    setOpenPass(true);
    handleClose();
  };
  const handleClosePass = () => setOpenPass(false);

  const [openProfile, setOpenProfile] = useState(false);
  const handleOpenProfile = () => {
    setOpenProfile(true);
    handleClose();
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  // Axios Fetch
  const getProfile = async () => {
    try {
      const res = await axiosPrivate.get(`/user/${auth.id}`);
      setProfile(res.data.data);
    } catch (error: any) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

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
          textAlign: "center",
        }}
      >
        <Card sx={{ width: "90%", alignSelf: "center", borderRadius: 3 }}>
          <Box sx={{ textAlign: "right", mx: 2 }}>
            <IconButton onClick={handleClick} size="small">
              <MoreHorizIcon fontSize="large" />
            </IconButton>
          </Box>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleOpenProfile}>Edit Profile</MenuItem>
            <MenuItem onClick={handleOpenPass}>Change Password</MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h1">Profile</Typography>
            <Divider>
              <Typography
                variant="h4"
                sx={{
                  borderRadius: "80px",
                  border: "1px solid #1976d2",
                  p: "5px",
                  color: "#3eb772",
                }}
              >
                {profile?.username}
              </Typography>
            </Divider>
            <Box sx={{ textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <PersonIcon fontSize="large" sx={{ mx: 2 }} />
                <Typography variant="h5" sx={{ mt: "5px" }}>
                  {profile?.namaLengkap}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <LocalPhoneIcon fontSize="large" sx={{ mx: 2 }} />
                <Typography variant="h5" sx={{ mt: "5px" }}>
                  {profile?.nomorHp}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <WorkIcon fontSize="large" sx={{ mx: 2 }} />
                <Typography variant="h5" sx={{ mt: "5px" }}>
                  {profile?.divisi}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <AccountTreeIcon fontSize="large" sx={{ mx: 2 }} />
                <Typography variant="h5" sx={{ mt: "5px" }}>
                  {profile?.role?.nama}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <ChangePass open={openPass} close={handleClosePass} />
      <UpdateProfile
        open={openProfile}
        close={handleCloseProfile}
        closeMenu={handleClose}
        getProfile={getProfile}
        profile={profile}
      />
    </>
  );
}

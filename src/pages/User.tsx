import {
  Box,
  Paper,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
  Modal,
  Button,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import { main, modal } from "../constant/styles";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function User() {
  //State
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<any>([]);
  const [query, setQuery] = useState<string>("");
  const [id, setId] = useState(user.id);
  const [namaLengkap, setNamaLengkap] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [nomorHp, setNomorHp] = useState<string>("");
  const [divisi, setDivisi] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [role, setRole] = useState<any>([]);
  const [roleId, setRoleid] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  //Open
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const handleShowPassword = () => setOpenPassword((show) => !show);

  const [openEdit, setOpenEdit] = useState<any>(false);
  const handleOpenEdit = (id: string) => {
    setOpenEdit(id);
    getRole();
    setId(id);
    getUserById(id);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setOpenBoxPass(false);
    setId("");
  };

  const [openBoxPass, setOpenBoxPass] = useState<boolean>(false);
  const handleOpenBoxPass = () => setOpenBoxPass(true);

  //Axios
  useEffect(() => {
    getUser();
    getRole();
    getUserById(user.id);
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate(`/user`);
      setUser(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axiosPrivate.delete(`/user/${id}`);
      getUser();
    } catch (error: any) {}
  };

  const getUserById = async (id: string) => {
    try {
      const res = await axiosPrivate(`/user/${id}`);
      setNamaLengkap(res.data.data.namaLengkap);
      setUsername(res.data.data.username);
      setDivisi(res.data.data.divisi);
      setNomorHp(res.data.data.nomorHp);
      setRoleid(res.data.data.role.id);
      setPass("");
      setPasswordConfirm("");
    } catch (error: any) {}
  };

  const getRole = async () => {
    try {
      const res = await axiosPrivate(`/role`);
      setRole(res.data.data);
    } catch (error) {}
  };

  const updateUser = async (event: any) => {
    event.preventDefault();
    if (pass !== passwordConfirm) {
      return;
    }
    try {
      const res = await axiosPrivate.patch(`/user/${id}`, {
        namaLengkap,
        username,
        nomorHp,
        divisi,
        roleId,
        password: pass ? pass : null,
      });
      setOpenEdit(false);
      setOpenBoxPass(false);
      setOpenPassword(false);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getUser();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setOpenPassword(false);
      setOpenBoxPass(false);
    }
  };

  //Loading
  if (isLoading) {
    return <Loading />;
  }

  let users;
  if (user) {
    users = user
      ?.filter((us: any) => {
        return us.namaLengkap.toLowerCase().indexOf(query.toLowerCase()) === 0;
      })
      ?.map((u: any) => (
        <TableRow key={u.id}>
          <TableCell>{u.namaLengkap}</TableCell>
          <TableCell align="center">{u.username}</TableCell>
          <TableCell align="center">{u.nomorHp}</TableCell>
          <TableCell align="center">{u.divisi}</TableCell>
          <TableCell align="center">{u.role ? u.role.nama : "???"}</TableCell>
          <TableCell align="center">
            <IconButton onClick={() => handleOpenEdit(u.id)}>
              <EditIcon color="primary" />
            </IconButton>

            <ModalDelete
              id={u.id}
              nama={u.namaLengkap}
              deleteFunction={deleteUser}
            />
          </TableCell>

          <Modal open={openEdit === u.id} onClose={handleCloseEdit}>
            <Box sx={modal}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Edit User
              </Typography>
              <Divider />
              <Box
                component="form"
                onSubmit={updateUser}
                sx={{
                  m: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-r-nama"
                  label="Nama"
                  value={namaLengkap}
                  onChange={(event) => setNamaLengkap(event.target.value)}
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-r-username"
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-r-nomor"
                  label="Nomor"
                  value={nomorHp}
                  onChange={(event) => setNomorHp(event.target.value)}
                />

                <Box sx={{ display: "flex", mt: 1 }}>
                  <Box
                    sx={{
                      mr: 1,
                      maxWidth: "14rem",
                    }}
                  >
                    <FormControl
                      required
                      fullWidth
                      sx={{ mb: 1.5, width: "14rem", textAlign: "left" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Divisi
                      </InputLabel>
                      <Select
                        id="divisi"
                        label="Divisi"
                        value={divisi}
                        onChange={(event) => setDivisi(event.target.value)}
                      >
                        <MenuItem value="Frontend">Frontend</MenuItem>
                        <MenuItem value="Backend">Backend</MenuItem>
                        <MenuItem value="Wordpress">Wordpress</MenuItem>
                        <MenuItem value="Project Manager">
                          Project Manager
                        </MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl
                      required
                      fullWidth
                      sx={{ width: "14rem", textAlign: "left" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        id="role"
                        label="Role"
                        value={roleId}
                        onChange={(event) => {
                          setRoleid(event.target.value);
                        }}
                      >
                        {role?.map((r: any) => (
                          <MenuItem value={r.id} key={r.id}>
                            {r.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {!openBoxPass ? (
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid grey",
                        borderRadius: 2,
                        minWidth: "14rem",
                      }}
                    >
                      <Button size="small" onClick={handleOpenBoxPass}>
                        Change Password ?
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2,
                      }}
                    >
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="pass">Password</InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          id="pass"
                          type={openPassword ? "text" : "password"}
                          label="Password"
                          onChange={(event) => setPass(event.target.value)}
                          sx={{ maxWidth: "14rem" }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {openPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="confirm-password">
                          Konfirmasi
                        </InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          id="confirm-password"
                          type={openPassword ? "text" : "password"}
                          label="Password"
                          onChange={(event) =>
                            setPasswordConfirm(event.target.value)
                          }
                          sx={{ maxWidth: "14rem" }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {openPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>
                  )}
                </Box>
                <Button sx={{ mt: 2 }} variant="contained" type="submit">
                  Submit
                </Button>
                <Button onClick={handleCloseEdit} color="error">
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </TableRow>
      ));
  }

  return (
    <>
      <Appbar />
      <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
        <Alert
          variant="filled"
          color={isErr ? "error" : "success"}
          severity={isErr ? "error" : "success"}
        >
          {mess}
        </Alert>
      </Snackbar>
      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">User List</Typography>
        </Box>

        <Box sx={{ mx: 5, mb: 1 }}>
          <TextField
            autoComplete="off"
            variant="standard"
            label="Search User"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Box>

        <Box
          className="tabel"
          sx={{ textAlign: "center", width: "95%", alignSelf: "center" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Nama Lengkap
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Username
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Nomor HP
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Divisi
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Role
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>{users}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

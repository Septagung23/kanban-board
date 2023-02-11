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
  Autocomplete,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import { main, modal } from "../constant/styles";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyIcon from "@mui/icons-material/Key";

import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function User() {
  //State
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<any>([]);
  const [id, setId] = useState(user.id);
  const [nama_lengkap, setNama_lengkap] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [nomor_hp, setNomor_hp] = useState<string>("");
  const [divisi, setDivisi] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [role, setRole] = useState<any>([]);
  const [roleName, setRolename] = useState(role.nama);
  const [roleId, setRoleid] = useState(role.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const options = role?.map((r: any) => ({ label: r.nama, id: r.id }));

  //Open
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const handleShowPassword = () => setOpenPassword((show) => !show);

  const [openEdit, setOpenEdit] = useState<any>(undefined);
  const handleOpenEdit = (id: string) => {
    setOpenEdit(id);
    getRole();
    setId(id);
    getUserById(id);
  };
  const handleCloseEdit = () => {
    setOpenEdit(undefined);
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
      setUser(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axiosPrivate.delete(`/user/${id}`);
      getUser();
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const res = await axiosPrivate(`/user/${id}`);
      console.log(res.data);
      setNama_lengkap(res.data.nama_lengkap);
      setUsername(res.data.username);
      setDivisi(res.data.divisi);
      setNomor_hp(res.data.nomor_hp);
      setRoleid(res.data.role.id);
      setRolename(res.data.role.nama);
      setPass("");
      setPasswordConfirm("");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getRole = async () => {
    try {
      const res = await axiosPrivate(`/role`);
      setRole(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (event: any) => {
    event.preventDefault();
    if (pass !== passwordConfirm) {
      return;
    }
    try {
      const res = await axiosPrivate.patch(`/user/${id}`, {
        nama_lengkap,
        username,
        nomor_hp,
        divisi,
        role_id: roleId,
        password: pass ? pass : null,
      });
      console.log(res);
      setOpenEdit(undefined);
      console.log();
      getUser();
    } catch (error: any) {
      console.log(error);
    }
  };

  //Loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Appbar />
      <Box className="container" sx={main}>
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">User List</Typography>
        </Box>

        <Box
          className="tabel"
          sx={{ textAlign: "center", width: "95%", alignSelf: "center" }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Lengkap</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Nomor HP</TableCell>
                  <TableCell align="center">Divisi</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {user.map((u: any) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.nama_lengkap}</TableCell>
                    <TableCell align="center">{u.username}</TableCell>
                    <TableCell align="center">{u.nomor_hp}</TableCell>
                    <TableCell align="center">{u.divisi}</TableCell>
                    <TableCell align="center">
                      {u.role ? u.role.nama : "???"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleOpenEdit(u.id)}>
                        <EditIcon color="primary" />
                      </IconButton>

                      <ModalDelete
                        id={u.id}
                        nama={u.nama_lengkap}
                        deleteFunction={deleteUser}
                      />
                    </TableCell>

                    <Modal open={openEdit === u.id} onClose={handleCloseEdit}>
                      <Box sx={modal} width="30%">
                        <Typography variant="h5">Edit User</Typography>
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
                          <Typography sx={{ textAlign: "left", my: 1 }}>
                            Nama Lengkap
                          </Typography>
                          <TextField
                            required
                            id="outlined-r-nama"
                            label="Nama"
                            value={nama_lengkap}
                            onChange={(event) =>
                              setNama_lengkap(event.target.value)
                            }
                          />
                          <Typography sx={{ textAlign: "left", my: 1 }}>
                            Username
                          </Typography>
                          <TextField
                            required
                            id="outlined-r-username"
                            label="username"
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                          <Typography sx={{ textAlign: "left", my: 1 }}>
                            Nomor HP
                          </Typography>
                          <TextField
                            required
                            id="outlined-r-nomor"
                            label="nomor"
                            value={nomor_hp}
                            onChange={(event) =>
                              setNomor_hp(event.target.value)
                            }
                          />

                          <Box sx={{ display: "flex" }}>
                            <Box
                              sx={{
                                width: "50%",
                                mt: 1,
                                mr: 1,
                              }}
                            >
                              <Typography sx={{ textAlign: "left", my: 1 }}>
                                Divisi
                              </Typography>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Divisi
                                </InputLabel>
                                <Select
                                  id="divisi"
                                  label="divisi"
                                  value={divisi}
                                  onChange={(event) =>
                                    setDivisi(event.target.value)
                                  }
                                >
                                  <MenuItem value="Frontend">Frontend</MenuItem>
                                  <MenuItem value="Backend">Backend</MenuItem>
                                  <MenuItem value="Wordpress">
                                    Wordpress
                                  </MenuItem>
                                  <MenuItem value="Project Manager">
                                    Project Manager
                                  </MenuItem>
                                  <MenuItem value="Admin">Admin</MenuItem>
                                </Select>
                              </FormControl>

                              <Typography sx={{ textAlign: "left", my: 1 }}>
                                Role
                              </Typography>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Role
                                </InputLabel>
                                <Select
                                  id="role"
                                  label="role"
                                  value={roleId}
                                  onChange={(event) =>
                                    setRoleid(event.target.value)
                                  }
                                >
                                  {role?.map((r: any) => (
                                    <MenuItem value={r.id}>{r.nama}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>

                            {!openBoxPass ? (
                              <Box
                                sx={{
                                  display: "grid",
                                  placeItems: "center",
                                  width: "50%",
                                  border: "1px solid grey",
                                  borderRadius: 2,
                                  mt: 1,
                                  p: 1,
                                }}
                              >
                                <Button
                                  size="small"
                                  onClick={handleOpenBoxPass}
                                >
                                  Change Password ?
                                </Button>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  width: "50%",
                                  mt: 1,
                                  borderRadius: 2,
                                  border: "1px solid grey",
                                  p: 1,
                                }}
                              >
                                <Typography sx={{ textAlign: "left", my: 1 }}>
                                  Password Baru
                                </Typography>
                                <FormControl variant="outlined">
                                  <InputLabel htmlFor="pass">
                                    Password
                                  </InputLabel>
                                  <OutlinedInput
                                    id="pass"
                                    type={openPassword ? "text" : "password"}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                          onClick={handleShowPassword}
                                        >
                                          {openPassword ? (
                                            <VisibilityOffIcon />
                                          ) : (
                                            <VisibilityIcon />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={(event) =>
                                      setPass(event.target.value)
                                    }
                                  />
                                </FormControl>

                                <Typography sx={{ textAlign: "left" }}>
                                  Konfirmasi Password
                                </Typography>
                                <FormControl variant="outlined">
                                  <InputLabel htmlFor="confirm-password">
                                    Konfirmasi
                                  </InputLabel>
                                  <OutlinedInput
                                    id="confirm-password"
                                    type={openPassword ? "text" : "password"}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                          onClick={handleShowPassword}
                                        >
                                          {openPassword ? (
                                            <VisibilityOffIcon />
                                          ) : (
                                            <VisibilityIcon />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={(event) =>
                                      setPasswordConfirm(event.target.value)
                                    }
                                  />
                                </FormControl>
                              </Box>
                            )}
                          </Box>
                          <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button onClick={handleCloseEdit} color="error">
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

{
  /* <Autocomplete
                                disablePortal
                                id="Client"
                                options={options}
                                value={roleName}
                                onChange={(event, values) => {
                                  console.log({ values });
                                  console.log(values.id);
                                  setRoleid(values.id);
                                }}
                                renderInput={(params: any) => (
                                  <TextField {...params} label="Role" />
                                )}
                              /> */
}

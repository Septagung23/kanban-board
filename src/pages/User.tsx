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
  const [roleName, setRolename] = useState(role.nama);
  const [roleId, setRoleid] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const options = role?.map((r: any) => ({ label: r.nama, id: r.id }));

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
      setNamaLengkap(res.data.namaLengkap);
      setUsername(res.data.username);
      setDivisi(res.data.divisi);
      setNomorHp(res.data.nomorHp);
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
      await axiosPrivate.patch(`/user/${id}`, {
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
      getUser();
    } catch (error: any) {
      console.log(error);
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
                  autoComplete="off"
                  id="outlined-r-nama"
                  label="Nama"
                  value={namaLengkap}
                  onChange={(event) => setNamaLengkap(event.target.value)}
                />
                <Typography sx={{ textAlign: "left", my: 1 }}>
                  Username
                </Typography>
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-r-username"
                  label="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Typography sx={{ textAlign: "left", my: 1 }}>
                  Nomor HP
                </Typography>
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-r-nomor"
                  label="nomor"
                  value={nomorHp}
                  onChange={(event) => setNomorHp(event.target.value)}
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
                        width: "50%",
                        border: "1px solid grey",
                        borderRadius: 2,
                        mt: 1,
                        p: 1,
                      }}
                    >
                      <Button size="small" onClick={handleOpenBoxPass}>
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
                      <Box display="flex" justifyContent="space-between" mr={1}>
                        <Typography sx={{ textAlign: "left", my: 1 }}>
                          Password Baru
                        </Typography>
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
                      </Box>
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="pass">Password</InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          id="pass"
                          type={openPassword ? "text" : "password"}
                          label="Password"
                          onChange={(event) => setPass(event.target.value)}
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
                          autoComplete="off"
                          id="confirm-password"
                          type={openPassword ? "text" : "password"}
                          label="Password"
                          onChange={(event) =>
                            setPasswordConfirm(event.target.value)
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

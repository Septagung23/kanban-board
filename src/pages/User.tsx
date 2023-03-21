import {
  Box,
  Typography,
  IconButton,
  Menu,
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
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/joy/CircularProgress";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import TableSkeleton from "../components/TableSkeleton";
import { main, modal } from "../constant/styles";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function User() {
  //State
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<any>([]);
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
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  //Open
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const handleShowPassword = () => setOpenPassword((show) => !show);

  const [openConfirmPass, setOpenConfirmPass] = useState<boolean>(false);
  const handleShowConfirmPass = () => setOpenConfirmPass((show) => !show);

  const [openEdit, setOpenEdit] = useState<any>(false);
  const handleOpenEdit = (id: string) => {
    setOpenEdit(id);
    getRole();
    setId(id);
    getUserById(id);
    handleCloseUser();
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setOpenBoxPass(false);
    setId("");
  };

  const [openBoxPass, setOpenBoxPass] = useState<boolean>(false);
  const handleOpenBoxPass = () => setOpenBoxPass(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenUser = (
    event: any,
    id: string,
    nomor: string,
    nama: string
  ) => {
    setAnchorEl(event.currentTarget);
    setId(id);
    setNomorHp(nomor);
    setNamaLengkap(nama);
  };
  const handleCloseUser = () => setAnchorEl(null);

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
    setUserLoading(true);
    try {
      const res = await axiosPrivate(`/user/${id}`);
      setNamaLengkap(res.data.data.namaLengkap);
      setUsername(res.data.data.username);
      setDivisi(res.data.data.divisi);
      setNomorHp(res.data.data.nomorHp);
      setRoleid(res.data.data.role.id);
      setPass("");
    } catch (error: any) {
    } finally {
      setUserLoading(false);
    }
  };

  const getRole = async () => {
    try {
      const res = await axiosPrivate(`/role`);
      setRole(res.data.data);
    } catch (error) {}
  };

  const updateUser = async (event: any) => {
    event.preventDefault();

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

  const rows: GridRowsProp = user.map((u: any) => ({
    id: u.id,
    nama: u.namaLengkap,
    username: u.username,
    nomor: u.nomorHp,
    divisi: u.divisi,
    role: u.role ? u.role.nama : "???",
  }));

  const columns: GridColDef[] = [
    {
      field: "nama",
      headerName: "Nama Lengkap",
      minWidth: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nomor",
      headerName: "Nomor Hp",
      minWidth: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "divisi",
      headerName: "Divisi",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              onClick={(event) =>
                handleOpenUser(
                  event,
                  cellValues.row.id,
                  cellValues.row.nomor,
                  cellValues.row.nama
                )
              }
            >
              <MoreHorizIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

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

        <div
          style={{
            height: 480,
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataGrid rows={rows} columns={columns} />
          )}
          <Menu
            open={openMenu}
            onClose={handleCloseUser}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleOpenEdit(id)}>
              <IconButton size="small">
                <EditIcon color="primary" />
              </IconButton>
              Edit user
            </MenuItem>

            <a
              href={`https://wa.me/${nomorHp}`}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <MenuItem>
                <IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#00e676"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </IconButton>
                Kontak Client
              </MenuItem>
            </a>

            <ModalDelete
              from="User"
              id={id}
              nama={namaLengkap}
              deleteFunction={deleteUser}
            />
          </Menu>

          <Modal open={openEdit === id} onClose={handleCloseEdit}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                minWidth: "458px",
                minHeight: "427px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: 4,
                px: 2,
                pt: 1,
                pb: 1,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Edit User
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              {userLoading ? (
                <Box
                  sx={{
                    display: "grid",
                    flex: 1,
                    placeItems: "center",
                  }}
                >
                  <CircularProgress color="success" variant="soft" />
                </Box>
              ) : (
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
                    helperText="Contoh : 628123456789 (gunakan kode negara tanpa tanda + dan spasi)"
                  />

                  <FormControl required fullWidth>
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

                  <FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
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

                  <FormControl required fullWidth>
                    <InputLabel htmlFor="pass">Password</InputLabel>
                    <OutlinedInput
                      autoComplete="off"
                      fullWidth
                      id="pass"
                      type={openPassword ? "text" : "password"}
                      label="Password"
                      onChange={(event) => setPass(event.target.value)}
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

                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                  <Button onClick={handleCloseEdit} color="error">
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Modal>
        </div>
      </Box>
    </>
  );
}

{
  /* <Menu
              open={openMenu}
              onClose={handleCloseUser}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {cellValues.row.id}
              <MenuItem onClick={() => handleOpenEdit(cellValues.row.id)}>
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
                Edit user
              </MenuItem>

              <a
                href={`https://wa.me/${cellValues.row.nomor}`}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <MenuItem>
                  <IconButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#00e676"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </IconButton>
                  Kontak Client
                </MenuItem>
              </a>

              <ModalDelete
                from="User"
                id={cellValues.id}
                nama={cellValues.row.nama}
                deleteFunction={deleteUser}
              />
            </Menu>

            <Modal open={openEdit === cellValues.id} onClose={handleCloseEdit}>
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
                            type={openConfirmPass ? "text" : "password"}
                            label="Password"
                            onChange={(event) =>
                              setPasswordConfirm(event.target.value)
                            }
                            sx={{ maxWidth: "14rem" }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleShowConfirmPass}
                                  edge="end"
                                >
                                  {openConfirmPass ? (
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
            </Modal> */
}

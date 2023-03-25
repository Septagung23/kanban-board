import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";
import { main } from "../constant/styles";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import Nodata from "../components/Nodata";
import TableSkeleton from "../components/TableSkeleton";

export default function Project() {
  const [project, setProject] = useState<any>([]);
  const [id, setId] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpen = (event: any, id: string, nama: string) => {
    setAnchorEl(event?.currentTarget);
    setId(id);
    setNama(nama);
  };
  const handleClose = () => setAnchorEl(null);

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/project");
      setProject(res.data.data);
    } catch (error: any) {
      setProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await axiosPrivate.delete(`/project/${id}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getProject();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const rows: GridRowsProp = project?.map((p: any) => ({
    id: p.id,
    nama: p.nama,
    jenis: p.jenisLayanan,
    perusahaan: p.client.perusahaan ? p.client.perusahaan : p.client.nama,
    keterangan: p.keterangan,
  }));

  const columns: GridColDef[] = [
    // {
    //   field: "view",
    //   headerName: "Board",
    //   sortable: false,
    //   disableColumnMenu: true,
    //   width: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <Link
    //         to={`/board/${cellValues.id}`}
    //         style={{ textDecoration: "none", color: "black" }}
    //       >
    //         <Tooltip title="Go To Board">
    //           <IconButton>
    //             <ViewKanbanIcon />
    //           </IconButton>
    //         </Tooltip>
    //       </Link>
    //     );
    //   },
    // },

    {
      field: "nama",
      headerName: "Nama",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "perusahaan",
      headerName: "Perusahaan",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "jenis",
      headerName: "Jenis Layanan",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      width: 450,
      align: "left",
      headerAlign: "center",
    },

    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   sortable: false,
    //   disableColumnMenu: true,
    //   width: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <Link to={`project/${cellValues.id}`}>
    //         <IconButton>
    //           <EditIcon color="primary" />
    //         </IconButton>
    //       </Link>
    //     );
    //   },
    // },
    // {
    //   field: "delete",
    //   headerName: "Hapus",
    //   sortable: false,
    //   disableColumnMenu: true,
    //   width: 100,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (cellValues) => {
    //     return (
    //       <ModalDelete
    //         id={cellValues.id}
    //         nama={cellValues.row.nama}
    //         deleteFunction={deleteProject}
    //       />
    //     );
    //   },
    // },

    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      sortable: false,
      width: 200,
      renderCell: (cellValues: any) => {
        return (
          <>
            <IconButton
              onClick={(event) =>
                handleOpen(event, cellValues.id, cellValues.row.nama)
              }
            >
              <MoreHorizIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const columnMember: GridColDef[] = [
    {
      field: "view",
      headerName: "Board",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <Link
            to={`/board/${cellValues.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <IconButton>
              <ViewKanbanIcon />
            </IconButton>
          </Link>
        );
      },
    },
    {
      field: "nama",
      headerName: "Nama",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "perusahaan",
      headerName: "Perusahaan",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "jenis",
      headerName: "Jenis Layanan",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "keterangan",
      headerName: "Keterangan",
      width: 350,
      align: "center",
      headerAlign: "center",
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
          <Typography variant="h3">Project List</Typography>
        </Box>
        {!isLoading ? (
          project ? (
            <div
              style={{
                height: 480,
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                justifyContent: "center",
              }}
            >
              <DataGrid
                rows={rows}
                columns={auth.role.id === 3 ? columnMember : columns}
              />

              <Menu
                open={openMenu}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Link
                  to={`/board/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <IconButton>
                      <ViewKanbanIcon fontSize="small" />
                    </IconButton>
                    Board
                  </MenuItem>
                </Link>

                <Link
                  to={`project/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <IconButton>
                      <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                    Edit Project
                  </MenuItem>
                </Link>

                <ModalDelete
                  from="Project"
                  id={id}
                  nama={nama}
                  deleteFunction={deleteProject}
                />
              </Menu>
            </div>
          ) : (
            // <>
            //   <Box sx={{ mx: 6 }}>
            //     <TextField
            //       autoComplete="off"
            //       variant="standard"
            //       label="Search Project"
            //       value={query}
            //       onChange={(event) => setQuery(event.target.value)}
            //     />
            //   </Box>
            //   <Box
            //     sx={{
            //       display: "flex",
            //       flexWrap: "wrap",
            //       mx: 4,
            //       my: 2,
            //     }}
            //   >
            //     {projects}
            //   </Box>
            // </>
            <Nodata message="Tidak ada project yang ditemukan" />
          )
        ) : (
          <TableSkeleton />
        )}
      </Box>
    </>
  );
}

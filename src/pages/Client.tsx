import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import Appbar from "../components/Appbar";
import ModalDelete from "../components/Delete/ModalDelete";
import Loading from "../components/Loading";
import { main } from "../constant/styles";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Nodata from "../components/Nodata";
import TableSkeleton from "../components/TableSkeleton";

export default function Client() {
  const [client, setClient] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const [id, setId] = useState<string>("");
  const [no, setNo] = useState<string>("");
  const [nama, setNama] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState(null);
  const openClient = Boolean(anchorEl);
  const handleOpenClient = (
    event: any,
    id: string,
    no: string,
    nama: string
  ) => {
    setAnchorEl(event.currentTarget);
    setId(id);
    setNo(no);
    setNama(nama);
  };
  const handleCloseClient = () => setAnchorEl(null);

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setClient(null);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const res = await axiosPrivate.delete(`/client/${id}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getClient();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const rows: GridRowsProp = client.map((c: any) => ({
    id: c.id,
    nama: c.nama,
    perusahaan: c.perusahaan ? c.perusahaan : "Perseorangan",
    nomor: c.nomorHp,
    alamat: c.alamat ? c.alamat : "-",
  }));

  const columns: GridColDef[] = [
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
      field: "nomor",
      headerName: "Nomor",
      width: 200,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "alamat",
      headerName: "Alamat",
      width: 350,
      align: "center",
      headerAlign: "center",
    },

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
                handleOpenClient(
                  event,
                  cellValues.id,
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
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Client List</Typography>
        </Box>
        {!isLoading ? (
          client ? (
            <div
              style={{
                height: 480,
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                justifyContent: "center",
              }}
            >
              <DataGrid rows={rows} columns={columns} />
              <Menu
                open={openClient}
                onClose={handleCloseClient}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Link
                  to={`/client/${id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <MenuItem>
                    <IconButton>
                      <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                    Edit Client
                  </MenuItem>
                </Link>
                <a
                  href={`https://wa.me/${no}`}
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
                  from="Client"
                  id={id}
                  nama={nama}
                  deleteFunction={deleteClient}
                />
              </Menu>
            </div>
          ) : (
            <Nodata message="Tidak ada client yang ditemukan" />
          )
        ) : (
          <TableSkeleton />
        )}
      </Box>
    </>
  );
}

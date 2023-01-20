import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Collapse,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Appbar from "../components/Appbar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

export default function Client() {
  const [openList, setOpenList] = useState<boolean>(false);
  const [client, setClient] = useState<any[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const handleClick = () => {
    setOpenList(!openList);
  };

  // const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  // const handleOpenDialog = (id: string) => {
  //   setOpenDialogDelete(true);
  // };
  // const handleCloseDialog = (id: string) => {
  //   setOpenDialogDelete(false);
  // };

  useEffect(() => {
    getClient();
  }, []);
  const getClient = async () => {
    try {
      const res = await axiosPrivate.get("/client");
      setClient(res.data);
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const deleteClient = async (id: string) => {
    try {
      await axiosPrivate.delete(`/client/${id}`);
      getClient();
    } catch (error: any) {
      console.log(error);
    }
  };

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
        }}
      >
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <Typography variant="h3">Client List</Typography>
        </Box>

        <Box
          sx={{
            alignSelf: "center",
            width: "80%",
            border: "1px solid grey",
            borderRadius: 3,
            m: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/create-client" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ m: 1 }}>
                Add Client
              </Button>
            </Link>
            <FormControlLabel
              control={<Checkbox onChange={handleClick} />}
              label="Detail"
            />
          </Box>
          <Divider />
          <List sx={{ p: 2 }}>
            {client.map((c) => (
              <>
                <ListItem
                  sx={{ border: "1px solid grey", borderRadius: 3, mt: 1 }}
                  key={c.id}
                >
                  <ListItemText primary={c.nama} key={c.nama} />
                  {/* {openList ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
                  <Divider orientation="vertical" flexItem />
                  <Link to={`/client/${c.id}`}>
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Link>
                  <IconButton color="error" onClick={() => deleteClient(c.id)}>
                    <DeleteIcon />
                  </IconButton>
                  {/* <Dialog open={openDialogDelete} onClose={handleCloseDialog}>
                    <DialogContent>
                      Apakah anda yakin ingin menghapus {c.nama} ? {c.id}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => deleteClient(c.id)}>Ya</Button>
                      <Button onClick={() => handleCloseDialog(c.id)}>
                        Tidak
                      </Button>
                    </DialogActions>
                  </Dialog> */}
                </ListItem>
                <Collapse
                  in={openList}
                  timeout="auto"
                  sx={{
                    mx: 1,
                    px: 1,
                    backgroundColor: "rgba(254, 250,224)",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ py: 1 }}>
                    <Typography variant="h6">Perusahaan : </Typography>
                    <TextField
                      size="small"
                      variant="standard"
                      defaultValue={c.perusahaan ? c.perusahaan : "-"}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Typography>Alamat : </Typography>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                      variant="standard"
                      defaultValue={c.alamat ? c.alamat : "-"}
                    />
                    <Typography>Nomor Telepon : </Typography>
                    <TextField
                      InputProps={{
                        readOnly: true,
                      }}
                      size="small"
                      variant="standard"
                      defaultValue={c.nomor_hp}
                    />
                  </Box>
                </Collapse>
              </>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}

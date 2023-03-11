import {
  Box,
  TextField,
  Button,
  Typography,
  Fab,
  Modal,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";
import { modal } from "../../constant/styles";

export default function CreateKategori(props: any) {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const handleOpenCategory = () => setOpenModalCategory(true);
  const handleCloseCategory = () => setOpenModalCategory(false);

  const [nama, setNama] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  const axiosPrivate = useAxiosPrivate();
  const getCategory = props.getCategory;

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post(`/kategori-task`, {
        nama,
        projectId: props.id,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      setOpenModalCategory(false);
      setIsLoading(false);
      getCategory();
      setNama("");
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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

      <Fab
        className="createKategori"
        aria-label="add"
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          m: 5,
          bgcolor: "#3eb772",
          color: "#f5f5f5",
          "&:hover": {
            backgroundColor: "#3eb772",
          },
        }}
        onClick={handleOpenCategory}
      >
        <AddIcon fontSize="large" />
      </Fab>
      <Modal
        open={openModalCategory}
        onClose={handleCloseCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Category
          </Typography>
          <Divider />
          <Box
            component="form"
            onSubmit={createCategory}
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <TextField
              autoComplete="off"
              required
              id="outlined-r-nama"
              label="Nama"
              value={nama}
              onChange={(event: any) => setNama(event.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Add Category
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

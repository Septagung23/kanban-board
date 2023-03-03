import {
  Box,
  TextField,
  Button,
  Typography,
  Fab,
  Modal,
  Divider,
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

  const axiosPrivate = useAxiosPrivate();
  const getCategory = props.getCategory;

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosPrivate.post(`/kategori-task`, {
        nama,
        projectId: props.id,
      });
      setOpenModalCategory(false);
      setIsLoading(false);
      getCategory();
      setNama("");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Fab
        className="createKategori"
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 0, bottom: 0, m: 5 }}
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
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography sx={{ textAlign: "left", my: 1 }}>
              Nama Kategori
            </Typography>
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

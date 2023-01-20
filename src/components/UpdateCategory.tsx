import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function UpdateKategori() {
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const handleOpenCategory = () => setOpenModalCategory(true);
  const handleCloseCategory = () => setOpenModalCategory(false);
  return (
    <>
      {/* Create Category */}
      <MenuItem onClick={handleOpenCategory}>
        <Typography sx={{ color: "grey" }}>Edit Category</Typography>
      </MenuItem>
      {/* Modal Create Category */}
      <Modal
        open={openModalCategory}
        onClose={handleCloseCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#eeeeee",
            borderRadius: "20px",
            boxShadow: 4,
            p: 4,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Category
          </Typography>

          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography sx={{ textAlign: "left", my: 1 }}>Nama</Typography>
            <TextField required id="outlined-r-nama" label="Nama" />
            <Typography sx={{ textAlign: "left", my: 1 }}>Index</Typography>
            <TextField
              required
              id="outlined-r-nama"
              label="Index"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
              }}
            />
            <Button sx={{ mt: 2 }} variant="contained">
              Add Category
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Modal Create Category */}
      {/* Create Category */}
    </>
  );
}

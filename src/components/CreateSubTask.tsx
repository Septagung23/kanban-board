import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  Divider,
  Modal,
  Fab,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Chip,
  TextField,
} from "@mui/material";

export default function CreateSubTask() {
  const [openModalSubTask, setOpenModalSubTask] = useState(false);
  const handleOpenSubTask = () => setOpenModalSubTask(true);
  const handleCloseSubTask = () => setOpenModalSubTask(false);

  return (
    <>
      <Button onClick={handleOpenSubTask} sx={{ color: "#000000" }}>
        Add Subtask
      </Button>
      <Modal hideBackdrop open={openModalSubTask} onClose={handleCloseSubTask}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "30%",
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
          <Typography>Create New Sub Task</Typography>
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography sx={{ textAlign: "left", my: 1 }}>
              Nama Sub Task
            </Typography>
            <TextField required id="outlined-r-nama" label="Nama" />
            <Typography sx={{ textAlign: "left", my: 1 }}>Member</Typography>
            <TextField required id="outlined-r-member" label="Member" />
            <Typography sx={{ textAlign: "left", my: 1 }}>
              Keterangan
            </Typography>
            <TextField
              multiline
              rows={3}
              required
              id="outlined-r-ket"
              label="Keterangan"
            />
            <Typography sx={{ textAlign: "left", my: 1 }}>Poin</Typography>
            <TextField
              required
              id="outlined-r-member"
              label="Member"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
              }}
              sx={{ width: "25ch" }}
            />

            <Button sx={{ mt: 2 }} variant="contained">
              Submit
            </Button>
            <Button onClick={handleCloseSubTask} color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function ModalDelete(props: any) {
  const id = props.id;
  const username = props.nama;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {props.categoryId ? (
        <MenuItem onClick={() => handleOpen()}>Delete Task</MenuItem>
      ) : (
        <IconButton color="error" onClick={() => handleOpen()} size="small">
          <DeleteIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Apakah anda yakin ingin menghapus <strong>{username}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            size="small"
          >
            Tidak
          </Button>
          <Button
            onClick={() => props.deleteFunction(id)}
            variant="contained"
            size="small"
            color="error"
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

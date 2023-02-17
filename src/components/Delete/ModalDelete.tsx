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
  const [open, setOpen] = useState<any>(undefined);
  const handleOpen = (id: string) => setOpen(id);

  const handleClose = () => setOpen(undefined);

  return (
    <>
      {props.categoryId ? (
        <MenuItem onClick={() => handleOpen(id)}>Delete Task</MenuItem>
      ) : (
        <IconButton color="error" onClick={() => handleOpen(id)} size="small">
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

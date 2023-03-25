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
      {props.from === "Task" || props.from === "Category" ? (
        <MenuItem onClick={() => handleOpen()}>Delete {props.from}</MenuItem>
      ) : props.from === "Client" ||
        props.from === "User" ||
        props.from === "Project" ? (
        <MenuItem onClick={() => handleOpen()}>
          <IconButton color="error" size="small">
            <DeleteIcon />
          </IconButton>
          Delete {props.from}
        </MenuItem>
      ) : props.from === "Comment" ? (
        <Button
          variant="text"
          size="small"
          sx={{
            textTransform: "capitalize",
            color: "black",
            minWidth: "2rem",
            minHeight: "2rem",
          }}
          onClick={() => handleOpen()}
        >
          Delete
        </Button>
      ) : (
        <IconButton color="error" onClick={() => handleOpen()} size="small">
          <DeleteIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Apakah anda yakin ingin menghapus{" "}
          {props.from === "Comment" ? (
            "Comment ini"
          ) : (
            <strong>{username}</strong>
          )}{" "}
          ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            color="error"
            size="small"
          >
            Tidak
          </Button>
          <Button
            onClick={() => props.deleteFunction(id)}
            variant="contained"
            size="small"
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

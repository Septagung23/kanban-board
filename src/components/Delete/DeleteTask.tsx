import {
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useState } from "react";

export default function DeleteTask(props: any) {
  const id = props.id;
  const username = props.nama;
  const [openModalTask, setOpenModalTask] = useState(false);
  const handleOpenTask = () => setOpenModalTask(true);
  const handleCloseTask = () => setOpenModalTask(false);

  return (
    <>
      <MenuItem onClick={handleOpenTask}>Delete Task</MenuItem>
      <Dialog open={openModalTask} onClose={handleCloseTask}>
        <DialogContent>
          Apakah anda yakin ingin menghapus <strong>{username}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTask} variant="contained" size="small">
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

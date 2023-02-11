import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useState } from "react";

export default function ModalDetail(props: any) {
  const id = props.id;
  const nama = props.nama;
  const perusahaan = props.perusahaan;
  const alamat = props.alamat;
  const nomor = props.nomor;
  const [open, setOpen] = useState<any>(undefined);
  const handleOpen = (id: string) => setOpen(id);
  const handleClose = () => setOpen(undefined);

  return (
    <>
      <ListItemButton onClick={() => handleOpen(id)}>
        <ListItemText primary={nama} />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose} key={id}>
        <DialogTitle>{nama}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ borderRadius: 2, border: "1px solid black", p: 1 }}>
            <Typography variant="h6">Perusahaan : </Typography>
            <TextField
              size="small"
              variant="standard"
              defaultValue={perusahaan ? perusahaan : "Perseorangan"}
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography variant="h6">Alamat : </Typography>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              size="small"
              variant="standard"
              defaultValue={alamat ? alamat : "-"}
            />
            <Typography variant="h6">Nomor Telepon : </Typography>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              size="small"
              variant="standard"
              defaultValue={nomor}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

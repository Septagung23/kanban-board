import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Typography,
  Divider,
  Modal,
  TextField,
} from "@mui/material";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { modal } from "../../constant/styles";

export default function CreateSubTask(props: any) {
  const id = props.id;
  const [openModalSubTask, setOpenModalSubTask] = useState(false);
  const handleOpenSubTask = () => setOpenModalSubTask(true);
  const handleCloseSubTask = () => setOpenModalSubTask(false);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [keterangan, setKeterangan] = useState<string>("");
  const [poin, setPoin] = useState<string>("1");

  const [user, setUser] = useState<any>([]);
  const [userId, setUserId] = useState<any>(user.id);
  const [nama, setNama] = useState<any>(user.nama);
  const options = user.map((u: any) => ({ label: u.namaLengkap, id: u.id }));

  const getSubtask = props.get;

  const createSubTask = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post(`/subtask`, {
        taskId: id,
        userId,
        keterangan,
        poin: parseInt(poin),
      });
      setIsLoading(false);
      setOpenModalSubTask(false);
      setKeterangan("");
      setPoin("1");
      setUserId("");
      getSubtask();
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user`);
      setUser(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getSubtask();
  }, []);

  return (
    <>
      <Button onClick={handleOpenSubTask} sx={{ color: "#000000" }}>
        Add Subtask
      </Button>

      <Modal hideBackdrop open={openModalSubTask} onClose={handleCloseSubTask}>
        <Box sx={modal} width="20%">
          <Typography variant="h5" paddingTop={2}>
            Create New Sub Task
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            component="form"
            onSubmit={createSubTask}
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography sx={{ textAlign: "left", my: 1 }}>
              Keterangan
            </Typography>
            <TextField
              required
              id="outlined-r-ket"
              label="Keterangan"
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
            />
            <Typography sx={{ textAlign: "left", my: 1 }}>Member</Typography>
            <Autocomplete
              disablePortal
              id="Member"
              options={options}
              value={nama}
              onChange={(event, values) => {
                setUserId(values.id);
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Member" />
              )}
            />
            <Typography sx={{ textAlign: "left", my: 1 }}>Poin</Typography>
            <TextField
              required
              id="outlined-r-member"
              label="Poin"
              type="number"
              InputProps={{
                inputProps: { min: 1, max: 100 },
              }}
              sx={{ width: "25ch" }}
              value={poin}
              onChange={(event) => setPoin(event.target.value)}
            />

            <Button sx={{ mt: 2 }} variant="contained" type="submit">
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

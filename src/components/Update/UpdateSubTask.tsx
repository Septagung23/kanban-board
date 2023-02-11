import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { modal } from "../../constant/styles";

export default function UpdateSubTask(props: any) {
  const [openModalSubTask, setOpenModalSubTask] = useState(false);
  const handleOpenSubTask = () => setOpenModalSubTask(true);
  const handleCloseSubTask = () => setOpenModalSubTask(false);
  const axiosPrivate = useAxiosPrivate();

  const [id, setId] = useState<string>(props?.id);
  const [keterangan, setKeterangan] = useState<string>(props.keterangan);
  const [poin, setPoin] = useState<string>(props.poin);
  const [user, setUser] = useState<any>(props.user);
  const [userId, setUserId] = useState<any>(user?.id);
  const [nama, setNama] = useState<any>(user?.username);
  const [taskId, setTaskId] = useState<string>(props.taskId);
  const [allUser, setAllUser] = useState<any>([]);
  const options = allUser?.map((u: any) => ({
    label: u.nama_lengkap,
    id: u.id,
  }));
  const getSubtask = props.getSubtask;

  const updateSubTask = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/subtask/${id}`, {
        task_id: taskId,
        user_id: userId,
        keterangan,
        poin: parseInt(poin),
      });
      console.log(res.data);
      setOpenModalSubTask(false);
      getSubtask();
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user`);
      setAllUser(res.data);
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
      <IconButton onClick={handleOpenSubTask}>
        <EditIcon color="primary" />
      </IconButton>

      <Modal hideBackdrop open={openModalSubTask} onClose={handleCloseSubTask}>
        <Box sx={modal}>
          <Typography>Edit Sub Task</Typography>
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
            component="form"
            onSubmit={updateSubTask}
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
                console.log(values?.id);
                setUserId(values.id);
              }}
              renderInput={(params: any) => (
                <TextField {...params} label={nama} />
              )}
            />
            <Typography sx={{ textAlign: "left", my: 1 }}>Poin</Typography>
            <TextField
              required
              id="outlined-r-member"
              label="Poin"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
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

import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  TextField,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { modal } from "../../constant/styles";

export default function UpdateSubTask(props: any) {
  const [openModalSubTask, setOpenModalSubTask] = useState(false);
  const handleOpenSubTask = () => setOpenModalSubTask(true);
  const handleCloseSubTask = () => setOpenModalSubTask(false);
  const axiosPrivate = useAxiosPrivate();

  const id = props?.id;
  const taskId = props.taskId;
  const getSubtask = props.getSubtask;
  const [keterangan, setKeterangan] = useState<string>(props.keterangan);
  const [poin, setPoin] = useState<string>(props.poin);
  const [user, setUser] = useState<any>(props.user);
  const [nama, setNama] = useState<any>(props.userName);
  const [allUser, setAllUser] = useState<any>([]);
  const options = allUser?.map((u: any) => ({
    label: u.namaLengkap,
    id: u.id,
  }));

  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

  const updateSubTask = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/subtask/${id}`, {
        taskId,
        userId: user,
        keterangan,
        poin: parseInt(poin),
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      setOpenModalSubTask(false);
      getSubtask();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user`);
      setAllUser(res.data.data);
    } catch (error: any) {}
  };

  const getUserbyId = async () => {
    try {
      const res = await axiosPrivate.get(`/user/${props.user}`);
      setUser(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    getSubtask();
    getUserbyId();
  }, []);

  return (
    <>
      <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
        <Alert
          variant="filled"
          color={isErr ? "error" : "success"}
          severity={isErr ? "error" : "success"}
        >
          {mess}
        </Alert>
      </Snackbar>

      <IconButton onClick={handleOpenSubTask}>
        <EditIcon color="primary" />
      </IconButton>

      <Modal open={openModalSubTask} onClose={handleCloseSubTask}>
        <Box sx={modal}>
          <Typography>Edit Sub Task</Typography>
          <Divider sx={{ my: 1 }} />
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
            <TextField
              autoComplete="off"
              required
              fullWidth
              id="outlined-r-ket"
              label="Keterangan"
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
            />
            <Autocomplete
              disablePortal
              fullWidth
              id="Member"
              options={options}
              isOptionEqualToValue={(option, value) => option.id === value}
              value={nama}
              onChange={(event, values) => {
                setNama(values.label);
                setUser(values.id);
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Member * " />
              )}
            />
            <TextField
              required
              id="outlined-r-member"
              fullWidth
              label="Poin"
              type="number"
              InputProps={{
                inputProps: { min: 1 },
              }}
              value={poin}
              onChange={(event) => setPoin(event.target.value)}
            />

            <Button variant="contained" type="submit">
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

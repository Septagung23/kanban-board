import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Typography,
  Divider,
  Modal,
  TextField,
  Snackbar,
  Alert,
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

  const [mess, setMess] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const [openMess, setOpenMess] = useState<boolean>(false);
  const closeMess = () => setOpenMess(false);

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
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getSubtask();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user`);
      setUser(res.data.data);
    } catch (error: any) {}
  };

  useEffect(() => {
    getUser();
    getSubtask();
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
              value={nama}
              onChange={(event, values) => {
                setUserId(values.id);
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Member" required />
              )}
            />
            <TextField
              required
              id="outlined-r-member"
              fullWidth
              label="Poin"
              type="number"
              InputProps={{
                inputProps: { min: 1, max: 100 },
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

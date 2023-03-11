import {
  Box,
  TextField,
  Button,
  Divider,
  Typography,
  Modal,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import { modal } from "../../constant/styles";
import { CirclePicker } from "react-color";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Label(props) {
  const [label, setLabel] = useState("");
  const [bgColor, setBgColor] = useState();
  const [color, setColor] = useState();
  const axiosPrivate = useAxiosPrivate();

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  const createLabel = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post(`/label-task`, {
        nama: label,
        taskId: props.id,
        bgColor,
        color,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.get();
      props.close();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const createLabelSubTask = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post(`/label-subtask`, {
        nama: label,
        subtaskId: props.subtaskId,
        bgColor,
        color,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.get();
      props.close();
      props.closeModal();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  useEffect(() => {
    setLabel("");
    setBgColor("");
    setColor("");
  }, [props.close]);

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

      <Modal open={props.open} onClose={props.close}>
        <Box
          sx={modal}
          component="form"
          onSubmit={props.isSubtask ? createLabelSubTask : createLabel}
        >
          <Typography variant="h5">
            Add Label {props.isSubtask ? "Subtask" : "Task"}
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              height: "3rem",
              my: 2,
              border: "1px solid grey",
              borderRadius: 8,
            }}
          >
            <Box
              sx={{
                width: "10rem",
                height: "1.5rem",
                backgroundColor: `${bgColor}`,
                color: `${color}`,
                borderRadius: 1,
                px: 1,
                textAlign: "left",
              }}
            >
              <Typography>{label}</Typography>
            </Box>
          </Box>
          <Box>
            <TextField
              autoComplete="off"
              fullWidth
              size="small"
              label="Label"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                mt: 1,
              }}
            >
              <FormControl>
                <FormLabel sx={{ color: "#000000" }}>Font Color</FormLabel>
                <RadioGroup
                  row
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                >
                  <FormControlLabel
                    value="#000000"
                    control={<Radio size="small" />}
                    label="Dark"
                  />
                  <FormControlLabel
                    value="#ffffff"
                    control={<Radio size="small" />}
                    label="Light"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Typography sx={{ textAlign: "left" }}>Select Color</Typography>
            <CirclePicker
              onChange={(col) => setBgColor(col.hex)}
              colors={[
                "#b7ddb0",
                "#f5ea92",
                "#fad29c",
                "#efb3ab",
                "#dfc0eb",
                "#7bc86c",
                "#f5dd29",
                "#ffaf3f",
                "#ef7564",
                "#cd8de5",
                "#5aac44",
                "#e6c60d",
                "#e79217",
                "#cf513d",
                "#a86cc1",
                "#8bbdd9",
                "#8fdfeb",
                "#b3f1d0",
                "#f9c2e4",
                "#505f79",
                "#5ba4cf",
                "#29cce5",
                "#6deca9",
                "#ff8ed4",
                "#344563",
                "#026aa7",
                "#00aecc",
                "#4ed583",
                "#e568af",
                "#091e42",
              ]}
            />
          </Box>
          <Button variant="contained" sx={{ my: 1 }} type="submit">
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}

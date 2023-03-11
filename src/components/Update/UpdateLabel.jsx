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
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UpdateLabel(props) {
  const axiosPrivate = useAxiosPrivate();

  const [label, setLabel] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  const updateLabel = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/label-task/${props?.labelId}`, {
        nama: label,
        bgColor,
        color,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.close();
      props.get();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const deleteLabel = async () => {
    try {
      const res = await axiosPrivate.delete(`/label-task/${props?.labelId}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.close();
      props.get();
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const updateLabelSt = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/label-subtask/${props?.labelId}`, {
        nama: label,
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

  const deleteLabelSt = async () => {
    try {
      const res = await axiosPrivate.delete(`/label-subtask/${props?.labelId}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      props.get();
      props.close();
      props.closeModal();
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  useEffect(() => {
    setLabel(props.nama);
    setBgColor(props.bgColor);
    setColor(props.color);
  }, [props.open]);

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
          onSubmit={props.isSubtask ? updateLabelSt : updateLabel}
        >
          <Typography>Edit Label</Typography>
          <Divider sx={{ mb: 1 }} />

          <Box sx={{ height: "3rem", display: "grid", placeItems: "center" }}>
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
              }}
            >
              <FormControl>
                <FormLabel>Font Color</FormLabel>
                <RadioGroup
                  row
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                >
                  <FormControlLabel
                    value="#ffffff"
                    control={<Radio size="small" />}
                    label="Light"
                  />
                  <FormControlLabel
                    value="#000000"
                    control={<Radio size="small" />}
                    label="Dark"
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

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() =>
              props.isSubtask
                ? deleteLabelSt(props.labelId)
                : deleteLabel(props.labelId)
            }
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
}

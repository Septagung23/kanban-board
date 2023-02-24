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
} from "@mui/material";
import { modal } from "../constant/styles";
import { CirclePicker } from "react-color";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Label(props) {
  const [label, setLabel] = useState("");
  const [bgColor, setBgColor] = useState();
  const [color, setColor] = useState();
  const [stId, setStId] = useState(props.stId);
  const axiosPrivate = useAxiosPrivate();

  const createLabel = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post(`/label-task`, {
        nama: label,
        taskId: props.id,
        bgColor,
        color,
      });
      props.get();
      props.close();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      console.log(error);
    }
  };

  const createLabelSubTask = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post(`/label-subtask`, {
        nama: label,
        subtaskId: props.stId,
        bgColor,
        color,
      });
      console.log(res.data);
      props.close();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      </Box>
    </Modal>
  );
}

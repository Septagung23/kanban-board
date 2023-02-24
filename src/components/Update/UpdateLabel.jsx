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
import { modal } from "../../constant/styles";
import { CirclePicker } from "react-color";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UpdateLabel(props) {
  const [label, setLabel] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const updateLabel = async (event) => {
    event.preventDefault();
    try {
      await axiosPrivate.patch(`/label-task/${props?.labelId}`, {
        nama: label,
        bgColor,
        color,
      });
      props.close();
      props.get();
      setLabel("");
      setColor("");
      setBgColor("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLabel = async () => {
    try {
      await axiosPrivate.delete(`/label-task/${props?.labelId}`);
      props.close();
      props.get();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLabel(props.nama);
    setBgColor(props.bgColor);
    setColor(props.color);
  }, [props.labelId]);

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box sx={modal} component="form" onSubmit={updateLabel}>
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
        {props.add ? null : (
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => deleteLabel(props.labelId)}
          >
            Delete
          </Button>
        )}
      </Box>
    </Modal>
  );
}

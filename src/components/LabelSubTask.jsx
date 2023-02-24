import {
  Box,
  TextField,
  Button,
  Divider,
  IconButton,
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
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Label from "./Label";

export default function LabelSubTask(props) {
  const [label, setLabel] = useState([]);
  const [openLabel, setOpenLabel] = useState(false);
  const addLabel = () => setOpenLabel(true);
  const closeAddLabel = () => setOpenLabel(false);
  const axiosPrivate = useAxiosPrivate();

  const getLabelSubtask = async () => {
    try {
      const res = await axiosPrivate.get(`/label-subtask/${props?.id}`);
      setLabel(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLabelSubtask();
  }, []);

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.close}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Box sx={modal} component="form">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Label</Typography>
            <IconButton onClick={addLabel}>
              <Add fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {label?.map((l) => (
                <>
                  <Divider />
                  <Box
                    sx={{
                      width: "10rem",
                      height: "1.5rem",
                      backgroundColor: `${l.bgColor}`,
                      color: `${l.color}`,
                      borderRadius: 1,
                      px: 1,
                      textAlign: "left",
                    }}
                  >
                    <Typography>{l.nama}</Typography>
                  </Box>
                  <IconButton sx={{ py: 0 }}>
                    <Edit fontSize="small" />
                  </IconButton>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>

      <Label
        open={openLabel}
        close={closeAddLabel}
        subtaskId={props.id}
        isSubtask={true}
      />
    </>
  );
}

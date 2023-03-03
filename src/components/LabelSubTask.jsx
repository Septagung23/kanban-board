import { Box, Divider, IconButton, Typography, Modal } from "@mui/material";

import { modal } from "../constant/styles";
import { useState, useEffect, Fragment } from "react";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Label from "./Create/Label";
import UpdateLabel from "./Update/UpdateLabel";

export default function LabelSubTask(props) {
  const [label, setLabel] = useState([]);

  const [openLabel, setOpenLabel] = useState(false);
  const addLabel = () => setOpenLabel(true);
  const closeAddLabel = () => setOpenLabel(false);

  const [editLabelSt, setEditLabelSt] = useState(false);
  const openEditLabelSt = (id) => {
    setEditLabelSt(true);
    setLabelIdSt(id);
  };
  const closeEditLabelSt = () => setEditLabelSt(false);

  const [labelSt, setLabelSt] = useState([]);
  const [labelIdSt, setLabelIdSt] = useState("");
  const [labelNameSt, setLabelNameSt] = useState("");
  const [bgColorSt, setBgColorSt] = useState("");
  const [colorSt, setColorSt] = useState("");

  useEffect(() => {
    setLabel(props.label);
  }, [props.open]);

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.close}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Box sx={modal} minWidth="11rem" component="form">
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
          <Divider />
          <Box sx={{ py: 1 }}>
            {label?.map((l) => (
              <Fragment key={l.id}>
                <Box sx={{ p: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    <IconButton
                      sx={{ py: 0 }}
                      onClick={() => {
                        openEditLabelSt(l.id);
                        setLabelNameSt(l.nama);
                        setBgColorSt(l.bgColor);
                        setColorSt(l.color);
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Fragment>
            ))}
          </Box>
        </Box>
      </Modal>

      <Label
        open={openLabel}
        close={closeAddLabel}
        closeModal={props.close}
        subtaskId={props.subtaskId}
        isSubtask={true}
        get={props.get}
      />

      <UpdateLabel
        open={editLabelSt}
        close={closeEditLabelSt}
        closeModal={props.close}
        get={props.get}
        labelId={labelIdSt}
        nama={labelNameSt}
        bgColor={bgColorSt}
        color={colorSt}
        isSubtask={true}
      />
    </>
  );
}

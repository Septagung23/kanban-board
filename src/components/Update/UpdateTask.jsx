import {
  Box,
  TextField,
  Button,
  MenuItem,
  Modal,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";

import { useState, useEffect } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Loading";

export default function UpdateTask(props) {
  const id = props.id;
  const keb = props.kebutuhan;
  const getCategory = props.getCategory;
  const [isLoading, setIsLoading] = useState(false);

  const blocksFromHtml = htmlToDraft(keb);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);

  const [nama, setNama] = useState(props.nama);
  const [prioritas, setPrioritas] = useState(props.prioritas);
  const [kebutuhan, setKebutuhan] = useState(editorState);
  const [attachment, setAttachment] = useState(props.attachment);
  const axiosPrivate = useAxiosPrivate();

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  useEffect(() => {
    getCategory();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(kebutuhan.getCurrentContent()));
    setIsLoading(true);
    try {
      const res = await axiosPrivate.patch(`/task/${id}`, {
        kategoriTaskId: props.categoryId,
        nama,
        kebutuhan: content,
        prioritas,
        attachment: JSON.stringify(attachment),
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      setIsLoading(false);
      getCategory();
      props.close();
      props.closeMenu();
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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

      <Modal
        className="modal"
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
      >
        {/* Modal Box */}
        <Box
          className="modal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "80%",
            backgroundColor: "#ffffff",
            boxShadow: 4,
            p: 4,
            display: "flex",
            overflowY: "scroll",
          }}
        >
          <Box
            className="Container"
            component="form"
            sx={{ width: 1 }}
            onSubmit={updateTask}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                autoComplete="off"
                id="outlined-multiline-flexible"
                label="Judul"
                required
                value={nama}
                onChange={(event) => setNama(event.target.value)}
              />

              <FormControl sx={{ minWidth: "10rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Prioritas *{" "}
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="prioritas"
                  value={prioritas}
                  onChange={(event) => setPrioritas(event.target.value)}
                >
                  <MenuItem value="Rendah">Rendah</MenuItem>
                  <MenuItem value="Sedang">Sedang</MenuItem>
                  <MenuItem value="Tinggi">Tinggi</MenuItem>
                  <MenuItem value="Sangat Tinggi">Sangat Tinggi</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                mt: 2,
              }}
            >
              {/* Kebutuhan */}
              <Box sx={{ my: 2 }}>
                <Editor
                  editorState={kebutuhan}
                  onEditorStateChange={(a) => setKebutuhan(a)}
                  toolbarClassName="kebutuhanT"
                  wrapperClassName="kebutuhanW"
                  editorClassName="kebutuhanE"
                  editorStyle={{
                    border: "1px solid #bebebe",
                    minHeight: "15rem",
                    borderRadius: "4px",
                  }}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                />

                <TextField
                  autoComplete="off"
                  id="outlined-multiline-flexible"
                  label="Attachment (opsional)"
                  fullWidth
                  helperText="*Link (Lebih dari 1, pisah dengan tanda koma (,))"
                  sx={{ mt: 2 }}
                  value={attachment}
                  onChange={(event) => setAttachment(event.target.value)}
                />
                <Box className="button" sx={{ my: 3, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={props.close}
                  >
                    Back
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

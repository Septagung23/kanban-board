import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Modal,
  Divider,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";

import { useState, useEffect } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "./Loading";
import { modal } from "../constant/styles";
import "../App.css";

export default function MenuKategori(props) {
  const axiosPrivate = useAxiosPrivate();
  const getCategory = props.getCategory;
  const deleteCategory = props.deleteCategory;
  const [isLoading, setIsLoading] = useState(false);

  // State
  const [categoryId, setCategoryId] = useState(props.id);
  const [title, setTitle] = useState(props.categoryData);

  const [judul, setJudul] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [kebutuhan, setKebutuhan] = useState("");
  const [attachment, setAttachment] = useState("");

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  // Function Open
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const handleOpenCategory = () => {
    setOpenModalCategory(true);
    handleClose();
  };
  const handleCloseCategory = () => setOpenModalCategory(false);

  const [openModalTask, setOpenModalTask] = useState(false);
  const handleOpenTask = () => {
    setOpenModalTask(true);
    handleClose();
  };
  const handleCloseTask = () => {
    setOpenModalTask(false);
    setJudul("");
    setPrioritas("");
    setKebutuhan("");
    setAttachment("");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Axios
  const createTask = async (event) => {
    event.preventDefault();
    const content = draftToHtml(convertToRaw(kebutuhan.getCurrentContent()));
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post(`/task`, {
        nama: judul,
        kategoriTaskId: categoryId,
        kebutuhan: content,
        prioritas,
        attachment,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      setOpenModalTask(false);
      setIsLoading(false);
      getCategory();
      handleClose();
      setJudul("");
      setKebutuhan("");
      setPrioritas("");
      setAttachment("");
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  const UpdateCategory = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosPrivate.patch(`/kategori-task/${categoryId}`, {
        nama: title,
      });
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      setOpenModalCategory(false);
      setAnchorEl(null);
      setIsLoading(false);
      getCategory();
    } catch (error) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenTask}>
          <Typography>Add Task</Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenCategory}>
          <Typography>Edit Category</Typography>
        </MenuItem>
        <MenuItem onClick={() => deleteCategory(props.id)}>
          <Typography>Delete Category</Typography>
        </MenuItem>
      </Menu>

      {/* Edit Category */}
      <Modal
        open={openModalCategory}
        onClose={handleCloseCategory}
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Category
          </Typography>
          <Divider />
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
            component="form"
            onSubmit={UpdateCategory}
          >
            <TextField
              autoComplete="off"
              required
              id="outlined-r-nama"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Add Task */}
      <Modal
        className="modal"
        open={openModalTask}
        onClose={handleCloseTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
      >
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
            onSubmit={createTask}
            sx={{ width: 1 }}
          >
            {/* Judul + Prioritas */}
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
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
              />
              <FormControl sx={{ minWidth: "10rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Prioritas *
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
                {/* Judul Kebutuhan */}
                <Editor
                  editorState={kebutuhan}
                  onEditorStateChange={(kebutuhan) => setKebutuhan(kebutuhan)}
                  toolbarClassName="kebutuhanT"
                  wrapperClassName="kebutuhanW"
                  editorClassName="kebutuhanE"
                  editorStyle={{
                    border: "1px solid #bebebe",
                    borderRadius: "4px",
                    minHeight: "15rem",
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
                  label="Attachment (opsional)"
                  helperText="*Link (Lebih dari 1, pisah dengan tanda koma (,))"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={attachment}
                  onChange={(event) => setAttachment(event.target.value)}
                />

                <Box className="button" sx={{ my: 2, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={handleCloseTask}
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

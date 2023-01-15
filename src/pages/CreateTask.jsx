import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Editor } from "react-draft-wysiwyg";
import { NavLink } from "react-router-dom";
import Appbar from "../components/Appbar";
const editorStyleObject = {
  border: "1px solid #bebebe",
  borderRadius: "4px",
};

export default function CreateTask() {
  return (
    <>
      <Appbar />
      {/* Container */}
      <Box
        className="container"
        sx={{
          width: "100%",
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {/* Judul + Logo */}
        <Box className="judul" sx={{ textAlign: "center" }}>
          <AddTaskIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Tambah Task</Typography>
        </Box>

        {/* Input */}
        <Box
          className="inputForm"
          sx={{ width: "80%", alignSelf: "center", mt: 3 }}
        >
          <Typography sx={{ mb: 1 }}>Kategori</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="kategori"
            >
              <MenuItem value={10}>Backlog</MenuItem>
              <MenuItem value={20}>Doing</MenuItem>
              <MenuItem value={30}>Production</MenuItem>
            </Select>
          </FormControl>
          <Typography>Kebutuhan</Typography>

          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorStyle={editorStyleObject}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />

          <Typography sx={{ mb: 1 }}>Prioritas</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Prioritas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="prioritas"
            >
              <MenuItem value={10}>Rendah</MenuItem>
              <MenuItem value={20}>Sedang</MenuItem>
              <MenuItem value={30}>Tinggi</MenuItem>
              <MenuItem value={40}>Sangat Tinggi</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ mb: 1 }}>Attachment</Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Attachment"
            multiline
            fullWidth
            maxRows={4}
          />
          {/* Button */}
          <Box className="button" sx={{ my: 3, textAlign: "right" }}>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ mr: 1 }} color="error">
                Back
              </Button>
            </NavLink>
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

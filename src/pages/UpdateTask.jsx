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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Editor } from "react-draft-wysiwyg";
import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";
const editorStyleObject = {
  border: "1px solid #bebebe",
  borderRadius: "4px",
};

export default function UpdateTask() {
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
          <BorderColorOutlinedIcon sx={{ fontSize: "60px" }} />
          <Typography variant="h3">Edit Task</Typography>
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
              <MenuItem value="Backlog">Backlog</MenuItem>
              <MenuItem value="Doing">Doing</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
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
              <MenuItem value="Rendah">Rendah</MenuItem>
              <MenuItem value="Sedang">Sedang</MenuItem>
              <MenuItem value="Tinggi">Tinggi</MenuItem>
              <MenuItem value="Sangat Tinggi">Sangat Tinggi</MenuItem>
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
            <Link to="/board" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ mr: 1 }} color="error">
                Back
              </Button>
            </Link>
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

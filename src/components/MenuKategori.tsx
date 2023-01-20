import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import UpdateKategori from "./UpdateCategory";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function MenuKategori() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          to="/create-task"
          style={{ textDecoration: "none", color: "grey" }}
        >
          <MenuItem>
            <Typography>Add New Task</Typography>
          </MenuItem>
        </Link>
        <MenuItem>
          <Typography sx={{ color: "grey" }}>Delete Category</Typography>
        </MenuItem>
        <UpdateKategori />
      </Menu>
    </div>
  );
}

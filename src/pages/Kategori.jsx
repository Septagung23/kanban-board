import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Card,
  CardContent,
  Typography,
  Divider,
  Modal,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Chip,
} from "@mui/material";

import "@asseinfo/react-kanban/dist/styles.css";
import Board, { moveCard, moveColumn } from "@asseinfo/react-kanban";

import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CreateSubTask from "../components/CreateSubTask";
import UpdateSubTask from "../components/UpdateSubTask";
import CreateKategori from "../components/CreateKategori";
import MenuKategori from "../components/MenuKategori";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content",
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content",
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content",
        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content",
        },
      ],
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content",
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content",
        },
      ],
    },
  ],
};

export default function Task() {
  const [controlledBoard, setBoard] = useState(board);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openList, setOpenList] = useState(false);

  const handleOpenList = () => {
    setOpenList(!openList);
  };
  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
    console.log(controlledBoard);
  }
  function handleColumnMove(_column, source, destination) {
    const updateColumn = moveColumn(controlledBoard, source, destination);
    setBoard(updateColumn);
  }
  const handleOpenDetail = () => setOpenModalDetail(true);
  const handleCloseDetail = () => setOpenModalDetail(false);

  return (
    <div className="Task">
      <CreateKategori />
      <Board
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        allowAddCard={{ on: "bottom" }}
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        // Column Header
        renderColumnHeader={({ title }) => (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 2,
              }}
            >
              <Typography>{title}</Typography>
              <MenuKategori />
            </Box>
          </>
        )}
        // Card
        renderCard={({ title, description }) => (
          <>
            <a onClick={handleOpenDetail}>
              <Card sx={{ width: "15.63rem", borderRadius: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link to="/edit-task" style={{ textDecoration: "none" }}>
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Link>
                  <IconButton color="error" size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Box>
                <CardContent sx={{ py: 0 }}>
                  <Typography variant="h6">{title}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1">{description}</Typography>
                </CardContent>
              </Card>
            </a>

            {/* Modal Detail*/}
            <Modal
              className="modal"
              open={openModalDetail}
              onClose={handleCloseDetail}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              BackdropProps={{
                style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
              }}
            >
              {/* Modal Box */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60%",
                  height: "60%",
                  backgroundColor: "#eeeeee",
                  borderRadius: "20px",
                  boxShadow: 4,
                  p: 4,
                  display: "flex",
                  overflowY: "scroll",
                }}
              >
                {/* Container */}
                <Box>
                  {/* Judul + Label */}
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                    >
                      Judul
                    </Typography>
                    <Box
                      sx={{
                        mr: 4,
                        mt: 1,
                        p: 1,
                        borderRadius: 3,
                        color: "#ffffff",
                      }}
                    >
                      Prioritas
                    </Box>
                  </Box>
                  <Typography
                    id="modal-modal-description"
                    variant="caption"
                    sx={{ mt: 2 }}
                  >
                    Kategori
                  </Typography>
                  <Divider />

                  {/* Content */}
                  <Box
                    sx={{
                      p: 2,
                      mt: 2,
                    }}
                  >
                    {/* Kebutuhan */}
                    <Box sx={{ my: 2 }}>
                      {/* Judul Kebutuhan */}
                      <Box sx={{ display: "flex" }}>
                        <SubjectIcon sx={{ mt: 0.3 }} />
                        <Typography variant="h5">Kebutuhan</Typography>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#ffffff",
                          p: 1,
                          borderRadius: 3,
                        }}
                      >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Laboriosam, fugiat exercitationem placeat
                        praesentium eum doloribus nobis. Ipsam rerum mollitia
                        eaque.
                      </Box>
                    </Box>

                    {/* Sub Task */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <FormatListBulletedIcon sx={{ mt: 0.3 }} />
                          <Typography variant="h5">Sub Task</Typography>
                        </div>
                        <CreateSubTask />
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: "#ffffff",
                          p: 1,
                          borderRadius: 3,
                        }}
                      >
                        <List>
                          <ListItemButton onClick={handleOpenList}>
                            <ListItemText primary="Sub Task 1" />
                            {openList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </ListItemButton>
                          <Collapse in={openList} timeout="auto" unmountOnExit>
                            <Box sx={{ px: 2 }}>
                              <Box
                                sx={{
                                  px: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Chip label="member1" />
                                <Box
                                  sx={{
                                    display: "flex",
                                    p: 1,
                                    borderRadius: 2,
                                    backgroundColor: "#eeeeee",
                                  }}
                                >
                                  <Typography>Poin</Typography>
                                  <Divider
                                    sx={{ mx: 1 }}
                                    orientation="vertical"
                                    flexItem
                                  />
                                  <Typography>100</Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <UpdateSubTask />
                                  <IconButton color="error">
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                              <Box sx={{ p: 1 }}>
                                <Typography>Keterangan</Typography>
                                <Box
                                  sx={{
                                    p: 1,
                                    border: "1px solid grey",
                                    borderRadius: 3,
                                  }}
                                >
                                  Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit. Laboriosam, fugiat
                                  exercitationem placeat praesentium eum
                                  doloribus nobis. Ipsam rerum mollitia eaque.
                                </Box>
                              </Box>
                            </Box>
                          </Collapse>
                        </List>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Modal>
            {/* Modal Detail */}
          </>
        )}
      >
        {controlledBoard}
      </Board>
    </div>
  );
}

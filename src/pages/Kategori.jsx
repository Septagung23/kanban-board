import { useState } from "react";
import "@asseinfo/react-kanban/dist/styles.css";
import Board, { moveCard, moveColumn } from "@asseinfo/react-kanban";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Modal,
  Fab,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [openModal, setOpenModal] = useState(false);
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
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div className="Task">
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 0, bottom: 0, m: 5 }}
      >
        <AddIcon />
      </Fab>

      <Board
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        allowAddCard={{ on: "bottom" }}
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        renderColumnHeader={({ title }) => (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {title}
            <Button>Add Card</Button>
          </Box>
        )}
        renderCard={({ title, description }) => (
          <>
            <Card sx={{ width: "15.63rem", borderRadius: "10px" }}>
              <CardContent>
                <Typography>{title}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>{description}</Typography>
              </CardContent>
              <Button onClick={handleOpen}>Detail</Button>
            </Card>
            <Modal
              className="modal"
              open={openModal}
              onClose={handleClose}
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
                          backgroundColor: "#FEFAE0",
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
                      <Box sx={{ display: "flex" }}>
                        <FormatListBulletedIcon sx={{ mt: 0.3 }} />
                        <Typography variant="h5">Sub Task</Typography>
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: "#FEFAE0",
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
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Chip label="member1" />
                                <Box
                                  sx={{
                                    display: "flex",
                                    p: 1,
                                    borderRadius: 3,
                                    backgroundColor: "#eeeeee",
                                  }}
                                >
                                  <Typography>Poin</Typography>
                                  <Divider
                                    sx={{ mx: 1 }}
                                    orientation="vertical"
                                  />
                                  <Typography>100</Typography>
                                </Box>
                              </Box>
                              <Box sx={{ p: 1 }}>
                                <Typography>Keterangan</Typography>
                                <Box
                                  sx={{
                                    backgroundColor: "white",
                                    p: 1,
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
          </>
        )}
      >
        {controlledBoard}
      </Board>
    </div>
  );
}

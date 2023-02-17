import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

import "@asseinfo/react-kanban/dist/styles.css";
import Board, { moveCard, moveColumn } from "@asseinfo/react-kanban";

import MenuKategori from "../components/MenuKategori";
import CreateKategori from "../components/Create/CreateKategori";
import ModalDetail from "../components/Detail/ModalDetailTask";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

const empty = {
  columns: [],
};

export default function Task() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  // Board
  const [category, setCategory] = useState([]);
  const [controlledBoard, setBoard] = useState({});

  // Function Open
  const [openModalDetail, setOpenModalDetail] = useState(undefined);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Function Move
  async function handleCardMove(_card, src, dest) {
    const updatedBoard = moveCard(controlledBoard, src, dest);
    setBoard(updatedBoard);
    await axiosPrivate.patch("/task/swap", updatedBoard);
  }
  async function handleColumnMove(_column, src, dest) {
    const updateBoard = moveColumn(controlledBoard, src, dest);
    setBoard(updateBoard);
    await axiosPrivate.patch("kategori-task/swap", updateBoard);
  }

  // Axios
  const getCategory = async () => {
    try {
      const res = await axiosPrivate.get(`/kategori-task/${id}`);
      const categoryTask = res.data;
      setCategory(categoryTask);
      setBoard({
        columns: categoryTask?.map(({ task: cards, nama: title, id: id }) => ({
          cards: cards.map((c) => ({
            ...c,
            description: c.kebutuhan,
            title: c.nama,
          })),
          title,
          id,
        })),
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setCategory(null);
      setBoard(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axiosPrivate.delete(`/task/${taskId}`);
      getCategory();
      setOpenModalDetail(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteCategory = async (id) => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.delete(`/kategori-task/${id}`);
      getCategory();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="Task">
      <CreateKategori id={id} getCategory={getCategory} />
      {category ? (
        <Board
          onCardDragEnd={handleCardMove}
          onColumnDragEnd={handleColumnMove}
          // Column Header
          renderColumnHeader={({ title, id }) => (
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
                <MenuKategori
                  id={id}
                  getCategory={getCategory}
                  deleteCategory={deleteCategory}
                  categoryData={title}
                />
              </Box>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleOpenTask}>
          <Typography>Add Task</Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenCategory}>
          <Typography>Edit Category</Typography>
        </MenuItem> */}
                <MenuItem onClick={() => deleteCategory(id)}>
                  <Typography>Delete Category</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
          // Card
          renderCard={({
            nama,
            kebutuhan,
            prioritas,
            id,
            attachment,
            kategoriTaskId,
          }) => (
            <>
              <Card sx={{ width: "15.63rem", borderRadius: 1 }} key={id}>
                <ModalDetail
                  id={id}
                  nama={nama}
                  kebutuhan={kebutuhan}
                  prioritas={prioritas}
                  categoryId={kategoriTaskId}
                  attachment={attachment}
                  getCategory={getCategory}
                  deleteFunction={deleteTask}
                />
              </Card>
            </>
          )}
        >
          {controlledBoard?.columns ? controlledBoard : empty}
        </Board>
      ) : (
        <img src="https://i.imgflip.com/7b3l1z.jpg" />
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

import "@asseinfo/react-kanban/dist/styles.css";
import Board, { moveCard, moveColumn } from "@asseinfo/react-kanban";

import MenuKategori from "../components/MenuKategori";
import CreateKategori from "../components/Create/CreateKategori";
import ModalDetail from "../components/Detail/ModalDetailTask";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const empty = {
  columns: [],
};

export default function Task() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // Board
  const [category, setCategory] = useState([]);
  const [controlledBoard, setBoard] = useState({});

  // Function Open
  const [openModalDetail, setOpenModalDetail] = useState(undefined);

  // Function Move
  async function handleCardMove(_card, src, dest) {
    const updatedBoard = moveCard(controlledBoard, src, dest);
    setBoard(updatedBoard);
    console.log(updatedBoard);
    await axiosPrivate.patch("/task/swap", updatedBoard);
  }
  async function handleColumnMove(_column, src, dest) {
    const updateBoard = moveColumn(controlledBoard, src, dest);
    setBoard(updateBoard);
    await axiosPrivate.patch("kategori-task/swap", updateBoard);
  }

  // Axios
  const getCategory = async () => {
    setIsLoading(true);
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

  return (
    <div className="Task">
      <CreateKategori id={id} getCategory={getCategory} />
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
                categoryData={title}
              />
            </Box>
          </>
        )}
        // Card
        renderCard={({
          nama,
          kebutuhan,
          prioritas,
          id,
          attachment,
          kategori_task_id,
        }) => (
          <>
            <Card sx={{ width: "15.63rem", borderRadius: "10px", p: 1 }}>
              <ModalDetail
                id={id}
                nama={nama}
                kebutuhan={kebutuhan}
                prioritas={prioritas}
                categoryId={kategori_task_id}
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
    </div>
  );
}

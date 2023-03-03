import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

import "@asseinfo/react-kanban/dist/styles.css";
import Board, { moveCard, moveColumn } from "@asseinfo/react-kanban";

import MenuKategori from "../components/MenuKategori";
import CreateKategori from "../components/Create/CreateKategori";
import ModalDetail from "../components/Detail/ModalDetailTask";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "../components/Loading";

export default function Task() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const empty = {
    columns: [],
  };

  // Board
  const [category, setCategory] = useState([]);
  const [controlledBoard, setBoard] = useState(empty);

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

  const deleteTask = async (taskId) => {
    try {
      await axiosPrivate.delete(`/task/${taskId}`);
      getCategory();
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteCategory = async (id) => {
    setIsLoading(true);
    try {
      await axiosPrivate.delete(`/kategori-task/${id}`);
      getCategory();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    <div className="Task">
      <CreateKategori id={id} getCategory={getCategory} />
      {category ? (
        <Board
          onCardDragEnd={handleCardMove}
          onColumnDragEnd={handleColumnMove}
          // Column Header
          renderColumnHeader={({ title, id }) => (
            <Fragment key={id}>
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
            </Fragment>
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
          )}
        >
          {controlledBoard}
        </Board>
      ) : (
        // <img src="https://i.imgflip.com/7b3l1z.jpg" />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h1">Tidak ada Data</Typography>
        </Box>
      )}
    </div>
  );
}

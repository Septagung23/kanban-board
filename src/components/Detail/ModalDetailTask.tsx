import {
  Box,
  IconButton,
  Typography,
  Divider,
  List,
  Menu,
  MenuItem,
  CardContent,
  Modal,
  ListItem,
  Chip,
} from "@mui/material";

import { useEffect, useState } from "react";

import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CreateSubTask from "../Create/CreateSubTask";
import UpdateSubTask from "../Update/UpdateSubTask";
import UpdateTask from "../Update/UpdateTask";
import DeleteTask from "../Delete/DeleteTask";

import parse from "html-react-parser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function ModalDetail(props: any) {
  //Handle Open Function
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const [openModalDetail, setOpenModalDetail] = useState<any>(undefined);
  const handleOpenDetail = (id: any) => setOpenModalDetail(id);
  const handleCloseDetail = () => setOpenModalDetail(undefined);

  const [openModalTask, setOpenModalTask] = useState(false);
  const handleOpenTask = () => {
    setOpenModalTask(true);
    handleCloseMenu();
  };
  const handleCloseTask = () => setOpenModalTask(false);

  //Var
  const [subTask, setSubTask] = useState<any>([]);
  const id = props.id;
  const nama = props.nama;
  const kebutuhan = props.kebutuhan;
  const prioritas = props.prioritas;
  const attachment = props.attachment;
  const categoryId = props.categoryId;
  const getCategory = props.getCategory;
  const deleteFunction = props.deleteFunction;

  //Axios Fetch
  const axiosPrivate = useAxiosPrivate();

  const getSubtask = async () => {
    try {
      const res = await axiosPrivate.get(`/task/${id}`);
      setSubTask(res.data.subtask);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubTask = async (id: string) => {
    try {
      await axiosPrivate.delete(`/subtask/${id}`);
      getSubtask();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubtask();
  }, []);

  return (
    <>
      <a onClick={() => handleOpenDetail(id)}>
        <CardContent sx={{ py: 0 }}>
          <Typography variant="h6">{nama}</Typography>
          <Divider sx={{ my: 1 }} />
        </CardContent>
      </a>

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
            width: "60%",
            height: "60%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#eeeeee",
            borderRadius: "20px",
            boxShadow: 4,
            p: 4,
            display: "flex",
            overflowY: "scroll",
            overFlowX: "hidden",
          }}
        >
          {/* Container */}
          <Box width="100%" className="container">
            {/* Judul + Label */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {nama}
              </Typography>
              <Box
                sx={{
                  mr: 1,
                  mt: 1,
                  p: 1,
                  borderRadius: 3,
                }}
              >
                Prioritas : {prioritas}
                <IconButton sx={{ ml: 1 }} onClick={handleClickMenu}>
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  open={openMenu}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleOpenTask}>Edit Task</MenuItem>
                  <DeleteTask
                    id={id}
                    nama={nama}
                    deleteFunction={deleteFunction}
                  />
                </Menu>
                <UpdateTask
                  id={id}
                  nama={nama}
                  kebutuhan={kebutuhan}
                  prioritas={prioritas}
                  categoryId={categoryId}
                  attachment={attachment}
                  getCategory={getCategory}
                  open={openModalTask}
                  close={handleCloseTask}
                  closeMenu={handleCloseMenu}
                />
              </Box>
            </Box>
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
                <Box sx={{ display: "flex", my: 1 }}>
                  <SubjectIcon sx={{ mt: 0.3 }} />
                  <Typography variant="h5">Kebutuhan</Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    px: 1,
                    borderRadius: 3,
                    border: "1px solid black",
                  }}
                >
                  {parse(kebutuhan)}
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
                  <CreateSubTask id={id} get={getSubtask} />
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    p: 0,
                    borderRadius: 3,
                    border: "1px solid black",
                  }}
                >
                  <List>
                    {subTask.map((st: any) => (
                      <>
                        <ListItem sx={{ p: 0 }} key={st?.id}>
                          <Box
                            sx={{
                              width: 1,
                              mx: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h6">
                              {st.keterangan}
                            </Typography>
                            {/* <Chip label={st.user.username} size="medium" /> */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <Chip
                                label={`Poin : ${st.poin}`}
                                sx={{ mr: 3 }}
                              />
                              <UpdateSubTask
                                id={st.id}
                                keterangan={st.keterangan}
                                poin={st.poin}
                                user={st.user}
                                taskId={id}
                                getSubtask={getSubtask}
                              />
                              <IconButton
                                color="error"
                                onClick={() => deleteSubTask(st.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </ListItem>
                        <Divider />
                      </>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

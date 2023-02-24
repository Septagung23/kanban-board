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
  Button,
  Avatar,
  TextField,
  Collapse,
} from "@mui/material";

import { useEffect, useState } from "react";

import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SaveIcon from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import LabelIcon from "@mui/icons-material/Label";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import CreateSubTask from "../Create/CreateSubTask";
import UpdateSubTask from "../Update/UpdateSubTask";
import UpdateTask from "../Update/UpdateTask";
import ModalDelete from "../Delete/ModalDelete";
import UpdateComment from "../Update/UpdateComment";

import parse from "html-react-parser";
import dayjs from "dayjs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../hooks/useAuth";
import Label from "../Label";
import UpdateLabel from "../Update/UpdateLabel";
import LabelSubTask from "../LabelSubTask";

export default function ModalDetail(props: any) {
  //Handle Open Function
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const [anchorElLabel, setAncElLab] = useState(null);
  const openMenuLabel = Boolean(anchorElLabel);
  const handleClickMenuLabel = (event: any) => setAncElLab(event.currentTarget);
  const handleCloseMenuLabel = () => setAncElLab(null);

  const [anchorElLabelS, setAncElLabS] = useState(null);
  const openMenuLabelS = Boolean(anchorElLabelS);
  const handleClickMenuLabelS = (event: any) => {
    setAncElLabS(event.currentTarget);
  };
  const handleCloseMenuLabelS = () => setAncElLabS(null);

  const [openModalDetail, setOpenModalDetail] = useState<any>(undefined);
  const handleOpenDetail = (id: any) => setOpenModalDetail(id);
  const handleCloseDetail = () => setOpenModalDetail(undefined);

  const [openModalTask, setOpenModalTask] = useState(false);
  const handleOpenTask = () => {
    setOpenModalTask(true);
    handleCloseMenu();
  };
  const handleCloseTask = () => setOpenModalTask(false);

  const [openLabel, setOpenLabel] = useState<boolean>(false);
  const addLabel = () => setOpenLabel(true);
  const closeAddLabel = () => setOpenLabel(false);

  const [openLabelSt, setOpenLabelSt] = useState<boolean>(false);
  const addLabelSt = (id: string) => {
    setOpenLabelSt(true);
    setSubTaskId(id);
  };
  const closeAddLabelSt = () => setOpenLabelSt(false);

  const [editLabel, setEditLabel] = useState<boolean>(false);
  const openEditLabel = (id: string) => {
    setEditLabel(true);
    setLabelId(id);
  };
  const closeEditLabel = () => setEditLabel(false);

  //Var
  const { auth } = useAuth();
  const namaUser = auth?.nama;
  const [subTask, setSubTask] = useState<any>([]);
  const [subTaskId, setSubTaskId] = useState<string>("");
  const id = props.id;
  const nama = props.nama;
  const kebutuhan = props.kebutuhan;
  const prioritas = props.prioritas;
  const attachment = props.attachment;
  const categoryId = props.categoryId;
  const getCategory = props.getCategory;
  const deleteFunction = props.deleteFunction;

  const [commentLine, setCommentLine] = useState<string>("");
  const [comment, setComment] = useState<any>([]);

  const [label, setLabel] = useState<any>([]);
  const [labelId, setLabelId] = useState<string>("");
  const [labelName, setLabelName] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [labelST, setLabelST] = useState<any>([]);
  // const [labelSTId, setLabelSTId] = useState<string>("");
  // const [labelSTName, setLabelSTName] = useState<string>("");
  // const [bgColorST, setBgColorST] = useState<string>("");
  // const [colorST, setColorST] = useState<string>("");

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

  const createComment = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post(`/komentar`, {
        taskId: id,
        konten: commentLine,
      });
      setCommentLine("");
      getComment();
    } catch (error: any) {
      console.log(error);
    }
  };

  const getComment = async () => {
    try {
      const res = await axiosPrivate.get(`/komentar/${id}`);
      setComment(res.data);
    } catch (error: any) {
      setComment(null);
      console.log(error);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await axiosPrivate.delete(`/komentar/${id}`);
      getComment();
    } catch (error) {
      console.log(error);
    }
  };

  const getLabel = async () => {
    try {
      const res = await axiosPrivate.get(`/label-task/${id}`);
      setLabel(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getLabelStask = async () => {
    try {
      const res = await axiosPrivate.get(`/label-subtask/${subTaskId}`);
      setLabelST(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubtask();
    getComment();
    getLabel();
    getLabelStask();
  }, []);

  return (
    <>
      {/* Card */}
      <a onClick={() => handleOpenDetail(id)} style={{ padding: "1rem" }}>
        <CardContent sx={{ px: 1, py: 0 }}>
          <Typography variant="h6">{nama}</Typography>
        </CardContent>
        <Divider />
        <Box sx={{ display: "flex", gap: 0.5, p: 1 }}>
          {label?.map((l: any) => (
            <Box
              sx={{
                width: "1rem",
                height: "0.5rem",
                backgroundColor: `${l?.bgColor}`,
                color: `${l?.color}`,
                borderRadius: 5,
                px: 1,
              }}
            ></Box>
          ))}
        </Box>
      </a>

      {/* Main */}
      <Modal
        className="modal"
        open={openModalDetail}
        onClose={handleCloseDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)", overflow: "hidden" },
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
            backgroundColor: "#ffffff",
            boxShadow: 4,
            p: 4,
            display: "flex",
            overflowY: "scroll",
          }}
        >
          {/* Container */}
          <Box width="100%" className="container">
            {/* Judul */}
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
              </Box>
            </Box>

            {/* Label */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {label?.map((l: any) => (
                <Box
                  sx={{
                    minWidth: "1.5rem",
                    minHeight: "1rem",
                    backgroundColor: `${l?.bgColor}`,
                    color: `${l?.color}`,
                    borderRadius: 5,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{l?.nama}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 1 }} />

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
                    borderRadius: 1,
                    border: "1px solid grey",
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
                  <Box style={{ display: "flex" }}>
                    <FormatListBulletedIcon sx={{ mt: 0.3 }} />
                    <Typography variant="h5">Sub Task</Typography>
                  </Box>
                  <CreateSubTask id={id} get={getSubtask} />
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    p: 0,
                    borderRadius: 1,
                    border: "1px solid grey",
                  }}
                >
                  <List>
                    {subTask.map((st: any) => (
                      <>
                        <ListItem sx={{ p: 0, display: "block" }} key={st?.id}>
                          <Box sx={{ display: "flex", gap: 0.5, mx: 1 }}>
                            {labelST?.map((lSt: any) => (
                              <Box
                                sx={{
                                  width: "0.8rem",
                                  height: "0.5rem",
                                  bgcolor: `${lSt.bgColor}`,
                                  color: `${lSt.color}`,
                                  borderRadius: 8,
                                }}
                              ></Box>
                            ))}
                          </Box>
                          <Box
                            sx={{
                              width: 1,
                              mx: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6">
                                {st.keterangan}
                              </Typography>
                            </Box>
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
                              <IconButton onClick={handleClickMenuLabelS}>
                                <LabelIcon color="success" />
                              </IconButton>
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

                        {/* Label Sub Task */}
                        <Menu
                          open={openMenuLabelS}
                          onClose={handleCloseMenuLabelS}
                          anchorEl={anchorElLabelS}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 2,
                              minWidth: "11rem",
                            }}
                          >
                            <Typography>Label</Typography>
                            <IconButton>
                              <Add
                                fontSize="small"
                                onClick={() => addLabelSt(st.id)}
                              />
                            </IconButton>
                          </Box>
                          {labelST?.map((lSt: any) => (
                            <div>
                              <Divider />
                              <Box sx={{ p: 1 }}>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Box
                                    sx={{
                                      width: "10rem",
                                      height: "1.5rem",
                                      backgroundColor: `${lSt.bgColor}`,
                                      color: `${lSt.color}`,
                                      borderRadius: 1,
                                      px: 1,
                                    }}
                                  >
                                    <Typography>{lSt.nama}</Typography>
                                  </Box>
                                  <IconButton sx={{ py: 0 }}>
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Box>
                            </div>
                          ))}
                        </Menu>
                      </>
                    ))}
                  </List>
                </Box>
              </Box>

              {/* Comment */}
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ChatBubbleOutlineIcon sx={{ mt: 0.3 }} />
                  <Typography variant="h5">Comment</Typography>
                </Box>
                <Box
                  sx={{ my: 1, display: "flex", alignItems: "center" }}
                  component="form"
                  onSubmit={createComment}
                >
                  <Avatar>
                    {namaUser?.split(" ").length > 1
                      ? `${namaUser?.split(" ")[0][0]}${
                          namaUser?.split(" ")[1][0]
                        }`
                      : `${namaUser?.split(" ")[0][0]}`}
                  </Avatar>
                  <TextField
                    multiline
                    autoComplete="off"
                    fullWidth
                    label="Comment ..."
                    size="small"
                    sx={{ mx: 1 }}
                    value={commentLine}
                    onChange={(event) => setCommentLine(event.target.value)}
                  />
                  <Button size="small" startIcon={<SaveIcon />} type="submit">
                    save
                  </Button>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    p: 1,
                    borderRadius: 1.5,
                    border: "1px solid grey",
                  }}
                >
                  {comment?.map((m: any) => (
                    <Box
                      sx={{
                        p: 1,
                        height: "5rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                        }}
                      >
                        <Avatar sx={{ width: 48, height: 48, mr: 1 }}>
                          <Typography variant="h5">
                            {m?.user?.namaLengkap.split(" ").length > 1
                              ? `${m?.user?.namaLengkap?.split(" ")[0][0]}${
                                  m?.user?.namaLengkap?.split(" ")[1][0]
                                }`
                              : `${m?.user?.namaLengkap?.split(" ")[0][0]}`}
                          </Typography>
                        </Avatar>
                        <Box sx={{ width: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <Typography sx={{ mr: 1 }}>
                              {m?.user?.namaLengkap}
                            </Typography>
                            {m?.updatedAt ? (
                              <Typography variant="caption">
                                {dayjs(m?.updatedAt).format("DD-MM-YY, HH:mm")}{" "}
                                (Edited)
                              </Typography>
                            ) : (
                              <Typography variant="caption">
                                {dayjs(m?.createdAt).format("DD-MM-YY, HH:mm")}{" "}
                              </Typography>
                            )}
                          </Box>

                          <Box>{m.konten}</Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {auth.id !== m.user.id ? null : (
                              <UpdateComment
                                id={m?.id}
                                comment={m}
                                get={getComment}
                              />
                            )}
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                textTransform: "capitalize",
                                color: "black",
                                minWidth: "2rem",
                                minHeight: "2rem",
                              }}
                              onClick={() => deleteComment(m?.id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Menu */}
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenTask}>Edit Task</MenuItem>
        <ModalDelete
          categoryId={categoryId}
          id={id}
          nama={nama}
          deleteFunction={deleteFunction}
        />
        <MenuItem onClick={handleClickMenuLabel}>Label</MenuItem>
      </Menu>

      {/* Update Task */}
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

      {/* Label Task */}
      <Menu
        open={openMenuLabel}
        onClose={handleCloseMenuLabel}
        anchorEl={anchorElLabel}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            minWidth: "10rem",
          }}
        >
          <Typography>Label</Typography>
          <IconButton>
            <Add fontSize="small" onClick={addLabel} />
          </IconButton>
        </Box>
        {label?.map((l: any) => (
          <div>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "10rem",
                    height: "1.5rem",
                    backgroundColor: `${l?.bgColor}`,
                    color: `${l?.color}`,
                    borderRadius: 1,
                    px: 1,
                  }}
                >
                  <Typography>{l.nama}</Typography>
                </Box>
                <IconButton
                  onClick={() => {
                    openEditLabel(l.id);
                    setLabelName(l.nama);
                    setBgColor(l.bgColor);
                    setColor(l.color);
                  }}
                  sx={{ py: 0 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </div>
        ))}
      </Menu>
      <Label open={openLabel} close={closeAddLabel} id={id} get={getLabel} />
      <UpdateLabel
        open={editLabel}
        close={closeEditLabel}
        get={getLabel}
        id={id}
        labelId={labelId}
        nama={labelName}
        bgColor={bgColor}
        color={color}
      />

      <Label
        open={openLabelSt}
        close={closeAddLabelSt}
        isSubtask={true}
        stId={subTaskId}
      />
    </>
  );
}

{
  /* <Menu
        open={openMenuLabel}
        onClose={handleCloseMenuLabel}
        anchorEl={anchorElLabel}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Typography>Label</Typography>
          <IconButton>
            <Add fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <MenuItem>
            <Checkbox sx={{ py: 0, pl: 0 }} />
            <Box
              sx={{
                width: "10rem",
                backgroundColor: "#3FAFC0",
                borderRadius: 1,
                px: 1,
              }}
            >
              Label
            </Box>
            <EditIcon fontSize="small" sx={{ pl: 1 }} />
          </MenuItem>
        </Box>
      </Menu> 
       <Button
                            variant="text"
                            size="small"
                            sx={{ textTransform: "capitalize", color: "black" }}
                            onClick={() => openEditComment(m?.id)}
                          >
                            Edit
                          </Button>  <Modal open={editComment} onClose={closeEditComment}>
                        <Box sx={modal}>
                          <TextField
                            multiline
                            fullWidth
                            autoComplete="off"
                            value={m.konten}
                            onChange={(event) =>
                              setCommentLine(event.target.value)
                            }
                          />

                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={closeEditComment}
                          >
                            Save
                          </Button>
                        </Box>
                      </Modal>  <Label open={openMenuLabel} close={handleCloseMenuLabel} /> 
                      <Box
              sx={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                bgcolor: `${bgColor}`,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "50%",
                  bgcolor: `${color}`,
                }}
              ></Box>
            </Box>
                      

            <LabelSubTask
        open={labelSubTask}
        close={closeLabelSubTask}
        id={subTaskId}
        label={labelST}
      /> 
                      */
}

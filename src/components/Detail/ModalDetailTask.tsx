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
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";

import { Fragment, useEffect, useState } from "react";

import SubjectIcon from "@mui/icons-material/Subject";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SaveIcon from "@mui/icons-material/Save";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import LabelIcon from "@mui/icons-material/Label";
import LinkIcon from "@mui/icons-material/Link";
import SendIcon from "@mui/icons-material/Send";

import CreateSubTask from "../Create/CreateSubTask";
import UpdateSubTask from "../Update/UpdateSubTask";
import UpdateTask from "../Update/UpdateTask";
import ModalDelete from "../Delete/ModalDelete";
import UpdateComment from "../Update/UpdateComment";

import parse from "html-react-parser";
import dayjs from "dayjs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../hooks/useAuth";
import Label from "../Create/Label";
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

  const [openModalDetail, setOpenModalDetail] = useState<any>(false);
  const handleOpenDetail = () => {
    setOpenModalDetail(true);
  };
  const handleCloseDetail = () => setOpenModalDetail(false);

  const [openModalTask, setOpenModalTask] = useState(false);
  const handleOpenTask = () => {
    setOpenModalTask(true);
    handleCloseMenu();
  };
  const handleCloseTask = () => setOpenModalTask(false);

  const [openModalLabel, setOpenModalLabel] = useState<any>(false);
  const handleOpenlabel = (id: string) => {
    setOpenModalLabel(id);
    setSubTaskId(id);
  };
  const handleCloselabel = () => setOpenModalLabel(false);

  const [openLabel, setOpenLabel] = useState<boolean>(false);
  const addLabel = () => setOpenLabel(true);
  const closeAddLabel = () => setOpenLabel(false);

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
  const attachment = props.attachment && props.attachment.split(", ");
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

  const [labelSt, setLabelSt] = useState<any>([]);

  //Error Handling
  const [mess, setMess] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [openMess, setOpenMess] = useState(false);
  const closeMess = () => setOpenMess(false);

  //Axios Fetch
  const axiosPrivate = useAxiosPrivate();

  const getSubtask = async () => {
    try {
      const res = await axiosPrivate.get(`/subtask/${id}`);
      setSubTask(res.data.data);
    } catch (error) {
      setSubTask(null);
    }
  };

  const deleteSubTask = async (id: string) => {
    try {
      const res = await axiosPrivate.delete(`/subtask/${id}`);
      setMess(res.data.message);
      setOpenMess(true);
      setIsErr(false);
      getSubtask();
    } catch (error: any) {
      setMess(error.response.data.message);
      setOpenMess(true);
      setIsErr(true);
    }
  };

  const createComment = async (event: any) => {
    event.preventDefault();
    try {
      await axiosPrivate.post(`/komentar`, {
        taskId: id,
        konten: commentLine,
      });
      setCommentLine("");
      getComment();
    } catch (error: any) {}
  };

  const getComment = async () => {
    try {
      const res = await axiosPrivate.get(`/komentar/${id}`);
      setComment(res.data.data);
    } catch (error: any) {
      setComment(null);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await axiosPrivate.delete(`/komentar/${id}`);
      getComment();
    } catch (error: any) {}
  };

  const getLabel = async () => {
    try {
      const res = await axiosPrivate.get(`/label-task/${id}`);
      setLabel(res.data.data);
    } catch (error: any) {
      setLabel(null);
    }
  };

  useEffect(() => {
    getSubtask();
    getComment();
    getLabel();
  }, []);

  return (
    <>
      {/* Card */}
      <a onClick={() => handleOpenDetail()} style={{ padding: "10px 0" }}>
        <CardContent sx={{ p: 1 }}>
          <Typography variant="body1" sx={{ textAlign: "left" }}>
            {nama}
          </Typography>
        </CardContent>
        <Divider />
        <Box sx={{ display: "flex", gap: 0.5, p: 1, flexWrap: "wrap" }}>
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
              key={l.id}
            >
              <Typography variant="caption">{l?.nama}</Typography>
            </Box>
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
            width: "80%",
            height: "85%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            boxShadow: 4,
            p: 3,
            display: "flex",
            overflowY: "scroll",
          }}
        >
          <Snackbar open={openMess} autoHideDuration={5000} onClose={closeMess}>
            <Alert
              variant="filled"
              color={isErr ? "error" : "success"}
              severity={isErr ? "error" : "success"}
            >
              {mess}
            </Alert>
          </Snackbar>
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
                  key={l.id}
                >
                  <Typography variant="body2">{l?.nama}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 1 }} />

            {/* Content */}
            <Box
              sx={{
                mt: 1,
              }}
            >
              {/* Kebutuhan */}
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    my: 1,
                    gap: 0.5,
                    alignItems: "center",
                  }}
                >
                  <SubjectIcon />
                  <Typography variant="h6">Kebutuhan</Typography>
                </Box>
                <Box
                  sx={{
                    px: 1,
                    borderRadius: 1,
                    border: "1px solid grey",
                  }}
                >
                  {parse(kebutuhan)}
                </Box>
              </Box>

              {/* Attachment */}
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    my: 1,
                    gap: 0.5,
                    alignItems: "center",
                  }}
                >
                  <LinkIcon />
                  <Typography variant="h6">Attachment</Typography>
                </Box>

                <Box sx={{ borderRadius: 1, border: "1px solid grey" }}>
                  <List>
                    {props.attachment ? (
                      <ul style={{ paddingLeft: 25 }}>
                        {attachment.map((a: string) => (
                          <li key={a}>
                            <a
                              href={`https://${a}`}
                              target="_blank"
                              style={{ textDecoration: "none" }}
                            >
                              {a}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography sx={{ textAlign: "center", color: "grey" }}>
                        Tidak ada Attachment
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>

              {/* Sub Task */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <FormatListBulletedIcon />
                    <Typography variant="h6">Sub Task</Typography>
                  </Box>
                  <CreateSubTask id={id} get={getSubtask} />
                </Box>

                <Box
                  sx={{
                    p: 0,
                    borderRadius: 1,
                    border: "1px solid grey",
                  }}
                >
                  <List>
                    {subTask ? (
                      subTask?.map((st: any) => (
                        <Fragment key={st?.id}>
                          <ListItem sx={{ px: 1, py: 0, display: "block" }}>
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
                                <Tooltip title={st.user.namaLengkap}>
                                  <Avatar sx={{ mr: 1, width: 32, height: 32 }}>
                                    <Typography>
                                      {st.user.namaLengkap?.split(" ").length >
                                      1
                                        ? `${
                                            st.user.namaLengkap?.split(
                                              " "
                                            )[0][0]
                                          }${
                                            st.user.namaLengkap?.split(
                                              " "
                                            )[1][0]
                                          }`
                                        : `${
                                            st.user.namaLengkap?.split(
                                              " "
                                            )[0][0]
                                          }`}
                                    </Typography>
                                  </Avatar>
                                </Tooltip>
                                <Chip
                                  label={`Poin : ${st.poin}`}
                                  sx={{ mr: 3 }}
                                />

                                <IconButton
                                  onClick={() => {
                                    handleOpenlabel(st.id);
                                    setLabelSt(st.labelSubtask);
                                  }}
                                  color="primary"
                                >
                                  <LabelIcon />
                                </IconButton>

                                <LabelSubTask
                                  open={openModalLabel}
                                  close={handleCloselabel}
                                  label={labelSt}
                                  subtaskId={subTaskId}
                                  get={getSubtask}
                                />

                                <UpdateSubTask
                                  id={st.id}
                                  keterangan={st.keterangan}
                                  poin={st.poin}
                                  user={st.user.id}
                                  userName={st.user.namaLengkap}
                                  taskId={id}
                                  getSubtask={getSubtask}
                                />

                                <ModalDelete
                                  id={st.id}
                                  nama={st.keterangan}
                                  deleteFunction={deleteSubTask}
                                />
                                {/* */}
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex", gap: 0.5, mx: 1 }}>
                              {st?.labelSubtask?.map((lSt: any) => (
                                <Box
                                  sx={{
                                    minWidth: "1rem",
                                    backgroundColor: `${lSt.bgColor}`,
                                    color: `${lSt.color}`,
                                    borderRadius: 5,
                                    px: 1,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  key={lSt.id}
                                >
                                  <Typography variant="body2">
                                    {lSt.nama}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </ListItem>

                          {/*  */}
                        </Fragment>
                      ))
                    ) : (
                      <Typography sx={{ textAlign: "center", color: "grey" }}>
                        Tidak ada Subtask
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>

              {/* Comment */}
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ChatBubbleOutlineIcon />
                  <Typography variant="h6">Comment</Typography>
                </Box>

                <Box
                  sx={{ my: 1, display: "flex", alignItems: "flex-start" }}
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
                  <Box sx={{ display: "flex", width: 1 }}>
                    <TextField
                      multiline
                      hiddenLabel
                      autoComplete="off"
                      fullWidth
                      label="Write a Comment"
                      size="small"
                      sx={{ mx: 1 }}
                      value={commentLine}
                      onChange={(event) => setCommentLine(event.target.value)}
                    />
                    <Button size="small" startIcon={<SendIcon />} type="submit">
                      Submit
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1.5,
                    border: "1px solid grey",
                  }}
                >
                  {comment ? (
                    comment?.map((m: any) => (
                      <Box
                        sx={{
                          height: "5rem",
                        }}
                        key={m.id}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.6rem",
                          }}
                        >
                          <Avatar sx={{ width: 42, height: 42 }}>
                            <Typography variant="h5">
                              {m?.user?.namaLengkap.split(" ").length > 1
                                ? `${m?.user?.namaLengkap?.split(" ")[0][0]}${
                                    m?.user?.namaLengkap?.split(" ")[1][0]
                                  }`
                                : `${m?.user?.namaLengkap?.split(" ")[0][0]}`}
                            </Typography>
                          </Avatar>
                          <Box sx={{ width: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: 0.5,
                              }}
                            >
                              <Typography sx={{ fontWeight: "bold" }}>
                                {m?.user?.namaLengkap}
                              </Typography>
                              {m?.updatedAt ? (
                                <Typography variant="caption">
                                  {dayjs(m?.updatedAt).format(
                                    "DD-MM-YY, HH:mm"
                                  )}{" "}
                                  (Edited)
                                </Typography>
                              ) : (
                                <Typography variant="caption">
                                  {dayjs(m?.createdAt).format(
                                    "DD-MM-YY, HH:mm"
                                  )}{" "}
                                </Typography>
                              )}
                            </Box>

                            <Box>
                              <Typography variant="body1">
                                {m.konten}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {auth.id !== m.user.id ? null : (
                                <UpdateComment
                                  id={m?.id}
                                  comment={m}
                                  get={getComment}
                                />
                              )}
                              {auth.id === m.user.id || auth.role.id === 1 ? (
                                <ModalDelete
                                  from="Comment"
                                  id={m.id}
                                  deleteFunction={deleteComment}
                                />
                              ) : null}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ textAlign: "center", color: "grey" }}>
                      Tidak ada Comment
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ minHeight: "1px", my: 1 }}> </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Menu */}
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenTask}>Edit Task</MenuItem>

        <ModalDelete
          from="Task"
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
        attachment={props.attachment}
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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
          <IconButton onClick={addLabel}>
            <Add fontSize="small" />
          </IconButton>
        </Box>
        {label?.map((l: any) => (
          <div key={l.id}>
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
        labelId={labelId}
        nama={labelName}
        bgColor={bgColor}
        color={color}
      />
    </>
  );
}

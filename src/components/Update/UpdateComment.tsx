import {
  Avatar,
  Box,
  TextField,
  Button,
  Typography,
  Modal,
} from "@mui/material";

import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";

export default function UpdateComment(props: any) {
  const id = props.id;
  const content = props.comment;
  const get = props.get;
  const axiosPrivate = useAxiosPrivate();

  const [editComment, setEditComment] = useState<any>(false);
  const openComment = () => setEditComment(true);
  const closeComment = () => setEditComment(false);

  const [comment, setComment] = useState<string>(content?.konten);

  const updateComment = async (event: any) => {
    event.preventDefault();
    try {
      await axiosPrivate.patch(`/komentar/${props?.id}`, {
        konten: comment,
      });
      closeComment();
      get();
    } catch (error: any) {}
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        sx={{
          textTransform: "capitalize",
          color: "black",
          px: 0,
          minWidth: "2rem",
          minHeight: "2rem",
        }}
        onClick={openComment}
      >
        Edit
      </Button>

      <Modal open={editComment} onClose={closeComment}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fefefe",
            borderRadius: 2,
            boxShadow: 4,
            p: 1,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Avatar sx={{ width: 48, height: 48, mr: 1 }}>
              <Typography variant="h5">
                {content?.user?.namaLengkap.split(" ").length > 1
                  ? `${content?.user?.namaLengkap?.split(" ")[0][0]}${
                      content?.user?.namaLengkap?.split(" ")[1][0]
                    }`
                  : `${content?.user?.namaLengkap?.split(" ")[0][0]}`}
              </Typography>
            </Avatar>
            <Box component="form" onSubmit={updateComment}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography sx={{ mr: 1 }}>
                  {content?.user?.namaLengkap}
                </Typography>
                <Typography variant="caption">
                  {dayjs(content?.createdAt).format("DD-MM-YY, HH:mm")}
                </Typography>
              </Box>
              <TextField
                multiline
                autoComplete="off"
                fullWidth
                size="small"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <Button
                size="small"
                startIcon={<SaveIcon />}
                type="submit"
                variant="contained"
                sx={{ mt: 1 }}
              >
                save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

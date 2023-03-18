import { Box } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress color="success" variant="soft" />
    </Box>
  );
}

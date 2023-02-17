import { Box, CircularProgress } from "@mui/material";
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
      <h1>Wait a Few Sec ...</h1>
      {/* <CircularProgress /> */}
    </Box>
  );
}

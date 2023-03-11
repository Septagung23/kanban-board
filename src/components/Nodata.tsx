import { Box, Typography } from "@mui/material";

export default function Nodata(props: any) {
  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="148"
        height="148"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M2 10.96a.985.985 0 0 1-.37-1.37L3.13 7c.11-.2.28-.34.47-.42l7.83-4.4c.16-.12.36-.18.57-.18c.21 0 .41.06.57.18l7.9 4.44c.19.1.35.26.44.46l1.45 2.52c.28.48.11 1.09-.36 1.36l-1 .58v4.96c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18c-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-5.54c-.3.17-.68.18-1 0m10-6.81v6.7l5.96-3.35L12 4.15M5 15.91l6 3.38v-6.71L5 9.21v6.7m14 0v-3.22l-5 2.9c-.33.18-.7.17-1 .01v3.69l6-3.38m-5.15-2.55l6.28-3.63l-.58-1.01l-6.28 3.63l.58 1.01Z"
        />
      </svg>

      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {props.message}
      </Typography>
    </Box>
  );
}

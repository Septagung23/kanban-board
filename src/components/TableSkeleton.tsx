import {
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export default function TableSkeleton() {
  const tcell = [];
  for (let i = 0; i < 6; i++) {
    tcell.push(
      <TableCell key={i}>
        <Skeleton animation="wave" />
      </TableCell>
    );
  }

  const tbodyr = [];
  for (let i = 0; i < 5; i++) {
    tbodyr.push(<TableRow key={i}>{tcell}</TableRow>);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>{tcell}</TableRow>
        </TableHead>

        <TableBody>{tbodyr}</TableBody>
      </Table>
    </TableContainer>
  );
}

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { Delete, PersonRemove } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT_GQ } from "../../mutations/clientMutations";
import { GET_CLIENTS_GQ } from "../../queries/clientQueries";

function ClientTable({ clients }: any) {
  const [deleteClient] = useMutation(DELETE_CLIENT_GQ);

  const DeleteClient = (id: any) => {
    deleteClient({
      variables: { id },
      refetchQueries: [{ query: GET_CLIENTS_GQ }],
    });
  };

  return (
      <TableContainer component={Paper}>
        <h3 style={{ fontFamily: "Inter", fontWeight: 500, padding: "10px" }}>
          Clients ({clients?.length})
        </h3>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client: any) => (
              <TableRow
                key={client.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {client.email}
                </TableCell>
                <TableCell align="center">{client.phone}</TableCell>
                <TableCell align="center">
                  <PersonRemove
                    onClick={() => DeleteClient(client.id)}
                    sx={{ color: "red", cursor:"pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default ClientTable;

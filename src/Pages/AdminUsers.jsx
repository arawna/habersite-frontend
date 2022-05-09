import {
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import EditIcon from "@mui/icons-material/Edit";
import ChangeUserTypeModal from "../Modals/ChangeUserTypeModal";
import { Box } from "@mui/system";

export default function AdminUsers() {
  const { authItem } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  let [users, setUsers] = useState([]);

  useEffect(() => {
    if (authItem[0].user.userType.type !== "admin") {
      navigate("/");
    }
  }, [authItem, navigate]);

  let [reloadValues, setReloadValues] = useState(new Date().toISOString());

  useEffect(() => {
    const userService = new UserService();
    userService.getAllUsersMailVerifyTrue(authItem[0].token).then((res) => {
      if (res.data.success) {
        setUsers(res.data.data);
      }
    });
  }, [authItem, reloadValues]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [selectedUser, setSelectedUser] = useState({});

  const handleEditClick = (user) => {
    setSelectedUser(user);
    handleOpen();
  };

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "20px" }}>
        <TableContainer component={Paper} style={{ maxHeight: "800px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Düzenle</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Tip</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ad</TableCell>
                <TableCell>Soy Ad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Button
                      type="contained"
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.userType.type}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ChangeUserTypeModal
            user={selectedUser}
            handleClose={handleClose}
            setReloadValues={setReloadValues}
          />
        </Box>
      </Modal>
    </>
  );
}

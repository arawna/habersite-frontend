import {
  Box,
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
import CategoryService from "../Service/CategoryService";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryAddModal from "../Modals/CategoryAddModal";
import UserService from "../Service/UserService";
import EditIcon from "@mui/icons-material/Edit";
import CategoryLeaderEditModal from "../Modals/CategoryLeaderEditModal";

export default function AdminCategories() {
  const { authItem } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authItem[0].user.userType.type !== "admin") {
      navigate("/");
    }
  }, [authItem, navigate]);

  let [categories, setCategories] = useState([]);
  let [moderators, setModerators] = useState([]);

  let [reloadValues, setReloadValues] = useState(new Date().toISOString());

  useEffect(() => {
    const categoryService = new CategoryService();
    const userService = new UserService();
    categoryService.getCategories().then((res) => {
      setCategories(res.data.data);
    });
    userService.getModerators().then((res) => {
      setModerators(res.data.data);
    });
  }, [reloadValues]);

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

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [userEditOpen, setUserEditOpen] = React.useState(false);
  const handleUserEditOpen = () => setUserEditOpen(true);
  const handleUserEditClose = () => setUserEditOpen(false);

  let [selectedUser, setSeletedUser] = useState({});

  const handleClickEditModerator = (user) => {
    setSeletedUser(user);
    handleUserEditOpen();
  };

  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: "20px" }}>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddModalOpen()}
          >
            Kategori Ekle
          </Button>
        </div>
        <TableContainer component={Paper} style={{ maxHeight: "800px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Kategori Adı</TableCell>
                <TableCell>Sil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          style={{ maxHeight: "800px", marginTop: "20px" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Moderatör Adı</TableCell>
                <TableCell>Soy Adı</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Yetkileri Düzenle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moderators.map((moderator) => (
                <TableRow key={moderator.id}>
                  <TableCell>{moderator.name}</TableCell>
                  <TableCell>{moderator.surname}</TableCell>
                  <TableCell>{moderator.email}</TableCell>
                  <TableCell
                    onClick={() => handleClickEditModerator(moderator)}
                  >
                    <EditIcon style={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CategoryAddModal
            handleAddModalClose={handleAddModalClose}
            setReloadValues={setReloadValues}
          />
        </Box>
      </Modal>
      <Modal
        open={userEditOpen}
        onClose={handleUserEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CategoryLeaderEditModal user={selectedUser} />
        </Box>
      </Modal>
    </>
  );
}

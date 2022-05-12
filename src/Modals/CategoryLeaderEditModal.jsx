import {
  Button,
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
import CategoryLeaderService from "../Service/CategoryLeaderService";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryService from "../Service/CategoryService";

export default function CategoryLeaderEditModal({ user }) {
  const { authItem } = useSelector(({ auth }) => auth);
  let [leaderCategories, setLeaderCategories] = useState([]);
  let [categories, setCategories] = useState([]);

  let [reloadValues, setReloadValues] = useState(new Date().toISOString());

  useEffect(() => {
    const categoryLeaderService = new CategoryLeaderService();
    const categoryService = new CategoryService();
    categoryLeaderService
      .getByUserId({ token: authItem[0].token, userId: user.id })
      .then((res) => {
        setLeaderCategories(res.data.data);
      });
    categoryService.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, [authItem, user, reloadValues]);

  const handleAddLeader = (categoryId) => {
    const categoryLeaderService = new CategoryLeaderService();
    categoryLeaderService
      .add({
        token: authItem[0].token,
        userId: user.id,
        categoryId: categoryId,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setReloadValues(new Date().toISOString());
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <div>
      <p>
        <b>
          {user.name} {user.surname}
        </b>{" "}
        nin Yetkili olduğu kategoriler
      </p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kategori Adı</TableCell>
              <TableCell>Yetkiyi Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.category.name}</TableCell>
                <TableCell>
                  <DeleteIcon style={{ color: "red" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Yeni yetki ekle</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kategori Adı</TableCell>
              <TableCell>Yetki Ekle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleAddLeader(category.id)}
                  >
                    Ekle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import CategoryService from "../Service/CategoryService";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryService = new CategoryService();
    categoryService.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <ListItemText>{category.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

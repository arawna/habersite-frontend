import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryLeaderService from "../Service/CategoryLeaderService";
import NewsService from "../Service/NewsService";

export default function AddNews() {
  const { authItem } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authItem[0].user.userType.type !== "moderator") {
      navigate("/");
    }
  }, [authItem, navigate]);

  useEffect(() => {
    const categoryLeaderService = new CategoryLeaderService();
    categoryLeaderService
      .getByUserId({ token: authItem[0].token, userId: authItem[0].user.id })
      .then((res) => {
        setCategories(res.data.data);
      });
  }, [authItem]);

  let [categories, setCategories] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState();
  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  let [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  let [content, setContent] = useState("");
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  let [privivate, setPrivate] = useState(false);
  const handlePrivateChange = (event) => {
    setPrivate(event.target.checked);
  };

  const handleSubmit = () => {
    if (selectedCategory && selectedFile && title && content) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const newsService = new NewsService();
      newsService
        .add(
          formData,
          title,
          content,
          selectedCategory,
          privivate,
          authItem[0].token
        )
        .then((res) => {
          alert(res.data.message);
        });
    } else {
      alert("Tüm alanlar doldurulmalıdır");
    }
  };

  return (
    <Container maxWidth="xl">
      <h1 style={{ marginTop: "20px", textAlign: "center" }}>Haber Ekle</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label="Kategori"
          onChange={handleChangeCategory}
        >
          {categories.map((category) => (
            <MenuItem key={category.category.id} value={category.category.id}>
              {category.category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p style={{ margin: "0px", marginTop: "10px" }}>Haber Resmi</p>
      <input
        type="file"
        onChange={handleFileSelect}
        style={{ width: "100%" }}
      />
      <TextField
        id="title"
        label="Haber Başlığı"
        variant="outlined"
        style={{ width: "100%", marginTop: "15px" }}
        onChange={handleTitleChange}
        value={title}
      />
      <TextField
        id="content"
        label="Haber İçeriği"
        variant="outlined"
        multiline
        rows={10}
        style={{ width: "100%", marginTop: "15px" }}
        onChange={handleContentChange}
        value={content}
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch value={privivate} onChange={handlePrivateChange} />}
          label="Uyelere Özel Haber"
        />
      </FormGroup>
      <Button
        variant="contained"
        style={{ width: "100%" }}
        onClick={() => handleSubmit()}
      >
        Haber Ekle
      </Button>
    </Container>
  );
}

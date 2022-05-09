import React from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import CategoryService from "../Service/CategoryService";

export default function CategoryAddModal({
  handleAddModalClose,
  setReloadValues,
}) {
  const { authItem } = useSelector(({ auth }) => auth);

  const addCategorySchema = Yup.object().shape({
    name: Yup.string().required("Kategori adı giriniz"),
  });

  const formik = useFormik({
    initialValues: {
      token: authItem[0].token,
      name: "",
    },
    validationSchema: addCategorySchema,
    onSubmit: (values) => {
      console.log(values);
      const categoryService = new CategoryService();
      categoryService.addCategory(values).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setReloadValues();
          handleAddModalClose();
        } else {
          alert(res.data.message);
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <b style={{ fontSize: "20px" }}>Kategori Ekle</b>
        <TextField
          id="name"
          label="Kategori Adı"
          variant="outlined"
          style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.errors.name}
        />
        <Button variant="contained" style={{ width: "100%" }} type="submit">
          Kategori Ekle
        </Button>
      </form>
    </div>
  );
}

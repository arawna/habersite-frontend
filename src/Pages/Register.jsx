import { Button, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import UserService from "../Service/UserService";

export default function Register() {
  const navigate = useNavigate();
  const { authItem } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (authItem[0].token) {
      navigate("/");
    }
  }, [authItem, navigate]);

  const registerSchema = Yup.object().shape({
    email: Yup.string().required("Email giriniz"),
    name: Yup.string().required("Ad giriniz"),
    surname: Yup.string().required("Soyad giriniz"),
    pass: Yup.string().required("Şifre giriniz"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      pass: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
      const userService = new UserService();
      userService.register(values).then((res) => {
          alert(res.data.message);
      })
    },
  });

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <b style={{ fontSize: "25px" }}>Kayıt Ol</b>
      <p onClick={() => navigate("/login")}>
        Zaten kayıtlı mısın{" "}
        <b style={{ color: "#187498", cursor: "pointer" }}>buraya</b> tıklayarak
        gitiş yap
      </p>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          style={{ width: "100%", marginBottom:"10px" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
        />
        <TextField
          id="name"
          label="İsim"
          variant="outlined"
          style={{ width: "100%", marginBottom:"10px" }}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.errors.name}
        />
        <TextField
          id="surname"
          label="Soy İsim"
          variant="outlined"
          style={{ width: "100%", marginBottom:"10px" }}
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surname && formik.errors.surname}
          helperText={formik.errors.surname}
        />
        <TextField
          id="pass"
          label="Şifre"
          variant="outlined"
          type="password"
          style={{ width: "100%", marginBottom:"10px" }}
          value={formik.values.pass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pass && formik.errors.pass}
          helperText={formik.errors.pass}
        />
        <Button style={{width:"100%"}} type="submit" variant="contained" color="primary">Kayıt Ol</Button>
      </form>
    </Container>
  );
}

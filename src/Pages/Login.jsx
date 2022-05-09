import { Button, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserService from "../Service/UserService";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Store/actions/authAction";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authItem } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if(authItem[0].token){
        navigate("/");
    }
  },[authItem,navigate])

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email giriniz"),
    pass: Yup.string().required("Şifre giriniz"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      const userService = new UserService();
      userService.login(values).then((res) => {
          if(res.data.data){
              localStorage.setItem("token",res.data.data.token);
              dispatch(userLogin(res.data.data));
          }else{
                alert(res.data.message);
          }
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
      <b style={{ fontSize: "25px" }}>Giriş Yap</b>
      <p onClick={() => navigate("/register")}>
        Kayıtlı değilmisin{" "}
        <b style={{ color: "#187498", cursor: "pointer" }}>buraya</b> tıklayarak
        kayıt ol
      </p>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          style={{ width: "100%" }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
        />
        <TextField
          id="pass"
          label="Şifre"
          type="password"
          variant="outlined"
          style={{ width: "100%", marginTop: "20px" }}
          value={formik.values.pass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pass && formik.errors.pass}
          helperText={formik.errors.pass}
        />
        <Button
          variant="contained"
          style={{ width: "100%", marginTop: "20px" }}
          type="submit"
        >
          Giriş Yap
        </Button>
      </form>

      <Button
        variant="contained"
        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        onClick={() => navigate("/register")}
      >
        Kayıt Ol
      </Button>
    </Container>
  );
}

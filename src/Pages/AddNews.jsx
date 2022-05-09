import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddNews() {
  const { authItem } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authItem[0].user.userType.type !== "moderator") {
      navigate("/");
    }
  }, [authItem, navigate]);

  return <Container maxWidth="xl">Haber Ekleme Sayfası</Container>;
}

import { Container, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Categories from "../Components/Categories";

export default function CategoryNews() {
  let { id } = useParams();
  return (
    <Container maxWidth="xl" style={{ border: "1px solid red" }}>
      <Grid container spacing={3} style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={3} style={{ border: "1px solid green" }}>
          <Categories />
        </Grid>
        <Grid item xs={12} md={9} style={{ border: "1px solid green" }}>
          haberler gelcek {id}
        </Grid>
      </Grid>
    </Container>
  );
}

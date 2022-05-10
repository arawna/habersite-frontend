import { Container, Grid } from "@mui/material";
import React from "react";
import Categories from "../Components/Categories";
import News from "../Components/News";

export default function HomePage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} style={{ marginTop: "30px" }}>
        <Grid item xs={12} md={3}>
          <Categories />
        </Grid>
        <Grid item xs={12} md={9}>
          <News />
        </Grid>
      </Grid>
    </Container>
  );
}

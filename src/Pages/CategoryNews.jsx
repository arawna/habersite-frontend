import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseUrl from "../Service/BaseUrl";
import NewsService from "../Service/NewsService";
import Categories from "../Components/Categories";

export default function CategoryNews() {
  let { id } = useParams();
  let [news, SetNews] = useState([]);
  const { authItem } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const newsService = new NewsService();
    if (authItem[0].token) {
      newsService
        .getByCategoryIdAll({ token: authItem[0].token, categoryId: id })
        .then((res) => {
          SetNews(res.data.data);
        });
    } else {
      newsService.getByCategoryIdAndPublic(id).then((res) => {
        SetNews(res.data.data);
      });
    }
  }, [authItem, id]);

  console.log(news);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3} style={{ marginTop: "30px" }}>
          <Grid item xs={12} md={3}>
            <Categories />
          </Grid>
          <Grid item xs={12} md={9}>
            {news.map((item) => (
              <Grid
                container
                key={item.id}
                style={{ height: "300px", marginBottom: "30px" }}
                spacing={3}
              >
                <Grid item xs={12} md={4}>
                  <div
                    style={{
                      height: "100%",
                      backgroundImage: `url('${BaseUrl}/api/image/show/${item.image.fileName}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div style={{ maxHeight: "300px", overflow: "hidden" }}>
                    <h3>
                      {item.title} -{" "}
                      <b style={{ color: item.privateNew ? "red" : "green" }}>
                        {item.privateNew ? "Üyelere Özel" : "Herkese Açık"}
                      </b>
                    </h3>
                    <h5 style={{ margin: "0px" }}>{item.category.name}</h5>
                    <hr />
                    <p>{item.content}</p>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

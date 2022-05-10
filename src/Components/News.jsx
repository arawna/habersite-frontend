import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BaseUrl from "../Service/BaseUrl";
import NewsService from "../Service/NewsService";

export default function News() {
  let [news, SetNews] = useState([]);
  const { authItem } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const newsService = new NewsService();
    if (authItem[0].token) {
      newsService.getAllNews({ token: authItem[0].token }).then((res) => {
        SetNews(res.data.data);
      });
    } else {
      newsService.getPublicNews().then((res) => {
        SetNews(res.data.data);
      });
    }
  }, [authItem]);

  console.log(news);

  return (
    <>
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
    </>
  );
}

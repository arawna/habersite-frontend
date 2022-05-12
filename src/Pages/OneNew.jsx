import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseUrl from "../Service/BaseUrl";
import ComentsService from "../Service/ComentsService";
import NewsService from "../Service/NewsService";

export default function OneNew() {
  let { id } = useParams();
  let [oneNew, setOneNew] = useState({});
  let [coments, setComents] = useState([]);
  let [reloadValues, setReloadValues] = useState(new Date().toISOString());

  useEffect(() => {
    const newsService = new NewsService();
    const comentsService = new ComentsService();
    newsService.getById(id).then((res) => {
      setOneNew(res.data);
    });
    comentsService.getByNewsId(id).then((res) => {
      setComents(res.data.data);
    });
  }, [id, reloadValues]);
  const { authItem } = useSelector(({ auth }) => auth);

  let [newComent, setNewComent] = useState("");
  const handleChangeNewComent = (event) => {
    setNewComent(event.target.value);
  };

  const handleSubmit = () => {
    const comentsService = new ComentsService();
    comentsService
      .add({ token: authItem[0].token, newsId: id, content: newComent })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          setReloadValues(new Date().toISOString());
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <div>
      <Container maxWidth="xl">
        {oneNew.title && (
          <>
            <div
              style={{
                backgroundImage: `url("${BaseUrl}/api/image/show/${oneNew?.image.fileName}")`,
                height: "300px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <h1>{oneNew?.title}</h1>
            <h3>
              {oneNew?.category.name} -{" "}
              {oneNew?.privateNew ? "Üyelere özel" : "Herkese Açık"}
            </h3>
            <hr />
            <p style={{ marginBottom: "50px" }}>{oneNew?.content}</p>
            <hr />
            {authItem[0].token && (
              <>
                <h3>Yorum Yap</h3>
                <TextField
                  id="coment"
                  label="Yorumunuz"
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={newComent}
                  onChange={handleChangeNewComent}
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={() => handleSubmit()}
                >
                  Gönder
                </Button>
              </>
            )}

            <h3>Yorumlar</h3>
            {coments.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  paddingLeft: "20px",
                }}
              >
                <p>
                  <b>
                    {item.user.name} {item.user.surname}
                  </b>
                </p>
                <p>{item.content}</p>
              </div>
            ))}
          </>
        )}
      </Container>
    </div>
  );
}

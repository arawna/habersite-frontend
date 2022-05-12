import axios from "axios";
import BaseUrl from "./BaseUrl";

export default class ComentsService {
  getByNewsId(newsId) {
    return axios.get(`${BaseUrl}/api/coments/getByNewsId?newsId=${newsId}`);
  }
  add(values) {
    return axios.post(`${BaseUrl}/api/coments/add`, values);
  }
}

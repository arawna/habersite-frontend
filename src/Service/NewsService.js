import axios from "axios";
import BaseUrl from "./BaseUrl";

export default class NewsService {
  getPublicNews() {
    return axios.get(`${BaseUrl}/api/new/getPublicNews`);
  }
  getAllNews(values) {
    return axios.post(`${BaseUrl}/api/new/getAll`, values);
  }
  getByCategoryIdAll(values) {
    return axios.post(`${BaseUrl}/api/new/getByCategoryIdAll`, values);
  }
  getByCategoryIdAndPublic(categoryId) {
    return axios.get(
      `${BaseUrl}/api/new/getByCategoryIdAndPublic?categoryId=${categoryId}`
    );
  }
  add(values, title, content, categoryId, privateNew, token) {
    return axios.post(
      `${BaseUrl}/api/new/add?title=${title}&content="${content}&categoryId=${categoryId}&privateNew=${privateNew}&token=${token}"`,
      values
    );
  }
}

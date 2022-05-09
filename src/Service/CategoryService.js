import axios from "axios";
import BaseUrl from "./BaseUrl";

export default class CategoryService {
  getCategories() {
    return axios.get(`${BaseUrl}/api/category/getAll`);
  }
  addCategory(values) {
    return axios.post(`${BaseUrl}/api/category/add`, values);
  }
}

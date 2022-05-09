import axios from "axios";
import BaseUrl from "./BaseUrl";

export default class CategoryLeaderService {
  getByUserId(values) {
    return axios.post(`${BaseUrl}/api/categoryLeader/getByUserId`, values);
  }
  add(values) {
    return axios.post(`${BaseUrl}/api/categoryLeader/add`, values);
  }
}

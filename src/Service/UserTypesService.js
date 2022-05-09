import axios from "axios";
import BaseUrl from "./BaseUrl";

export default class UserTypesService {
  getUserTypes() {
    return axios.get(`${BaseUrl}/api/userTypes/getAll`);
  }
}

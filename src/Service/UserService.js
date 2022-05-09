import axios from 'axios';
import BaseUrl from './BaseUrl';

export default class UserService {
    login(values){
        return axios.post(`${BaseUrl}/api/user/login`,values);
    }
    register(values){
        return axios.post(`${BaseUrl}/api/user/register`,values);
    }
}
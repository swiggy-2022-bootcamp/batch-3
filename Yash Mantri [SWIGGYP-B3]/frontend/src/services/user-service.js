import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/test/';
const restaurant_URL = 'http://localhost:8000/api/restuarant/';
class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getrestaurant() {
        return axios.get(restaurant_URL);
    }

    getmenu(restaurantId) {
        return axios.get('http://127.0.0.1:8000/api/restaurant/1');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
import axios from 'axios';

const API = 'http://localhost:3004';

const GET = route => {
    return axios.get(`${API}${route}`);
};

const POST = (route, data) => {
    return axios.post(`${API}${route}`, data)
};

const PUT = (route, id, data) => {
    return axios.put(`${API}${route}/${id}`, data)
};

const DELETE = (route, id) => {
    return axios.delete(`${API}${route}/${id}`)
};

export {
    POST,
    GET,
    DELETE,
    PUT,
}
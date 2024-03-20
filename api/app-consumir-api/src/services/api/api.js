import axios from 'axios';

const api = axios.create({
    baseURL:'http://10.0.0.185:7000'
});

export default api;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-phl.firebaseio.com/',

});

export default instance;
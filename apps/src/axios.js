import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',

    // CORS issue headers.
    // https://stackoverflow.com/a/54342285
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;
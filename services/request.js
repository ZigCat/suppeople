import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:22867',
    headers: { Accept: 'application/json' },
});
  
export default request
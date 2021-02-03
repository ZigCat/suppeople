import axios from 'axios';

const request = axios.create({
    baseURL: 'http://167.99.220.160:22867',
    headers: { Accept: 'application/json' },
});
  
export default request
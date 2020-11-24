import request from '../services/request';

export const getCities = () => 
    request
        .get('/cities',{
            params: {
                size:20,
            }
        })
        .then(res => res.data)
        .catch(err => err.response);
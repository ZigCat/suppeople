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

export const getCategories = () => 
        request
            .get('/category', {
                params: {
                    size: 8,
                }
            })
            .then(res => res.data)
            .catch(err => err.response);
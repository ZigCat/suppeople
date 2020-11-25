import request from '../services/request';

export const registration = (form) => 
    request
        .post('/users', form)
        .then(res => res.data)
        .catch(err => err.response);
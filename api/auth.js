import request from '../services/request'

export const login = data =>
  request
    .post('/auth/login', data)
    .then(res => res)
    .catch(err => err.response)
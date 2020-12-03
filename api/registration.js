import request from '../services/request';

export const registration = (form) => 
    request
        .post('/users', form)
        .catch(err => err.response);

export const login = (form) => 
    request
        .get('/authorized', {
            auth:{
                username:form.login,
                password:form.password,
            }
        })
        .catch(err => console.log(err));
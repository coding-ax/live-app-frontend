import instance from '../utils/api'

export const registerUser = (data = {}, option = {}) => {
    return instance.post('/login/register', data, option)
};

export const loginUser = (data = {}, option = {}) => {
    return instance.post('/login', data, option)
};
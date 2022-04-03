import instance from '../utils/api'

const prefix = '/login';

export const registerUser = (data = {}, option = {}) => {
    return instance.post(`${prefix}/register`, data, option)
};

export const loginUser = (data = {}, option = {}) => {
    return instance.post(`${prefix}`, data, option)
};

export const updateProfile = (data = {}, option = {}) => {
    return instance.post(`${prefix}/update_profile`, data, option)
};

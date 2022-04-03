import instance from '../utils/api'

const prefix = '/live';

export const editLive = (data = {}, option = {}) => {
    return instance.post(`${prefix}/edit`, data, option)
};

export const getLiveList = (data = {}, option = {}) => {
    return instance.get(`${prefix}`, { params: data }, option)
}

export const getSecretLiveList = (data = {}, option = {}) => {
    return instance.post(`${prefix}`, data, option)
};
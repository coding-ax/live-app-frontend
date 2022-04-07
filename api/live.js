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

export const getLiveDetail = (data = {}, option = {}) => {
    return instance.get(`${prefix}/live-detail`, { params: data }, option)
}

export const delLive = (data = {}, option = {}) => {
    return instance.delete(`${prefix}/del`, {
        params: data
    }, option)
}

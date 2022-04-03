import instance from '../utils/api'

const prefix = '/live';

export const editLive = (data = {}, option = {}) => {
    return instance.post(`${prefix}/edit`, data, option)
};

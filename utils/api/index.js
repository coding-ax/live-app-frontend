import axios from 'axios';
const settle = require('axios/lib/core/settle');
const buildURL = require('axios/lib/helpers/buildURL');

const baseURL = 'http://localhost:3000'

const instance = axios.create({
    baseURL,
    timeout: 30,
    crossDomain: true
})

instance.defaults.adapter = (config) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        })
    })
}

instance.interceptors.request.use((config) => {
    return config;
},
    error => {
        uni.showToast({
            title: `请求发送失败：${error}`,
        })
    }
)

instance.interceptors.response.use(res => {
    // 如果后端返回的 code 不为0，说明存在错误
    if (res.data?.code) {
        uni.showToast({
            title: res.data?.message,
            icon: 'none',
        })
        return Promise.reject(res.data)
    }
    return Promise.resolve(res.data);
},
    error => {
        uni.showToast({
            title: `后端异常：${error}`,
            icon: 'fail',
        })
        return Promise.reject(error);
    }
)


export default instance;
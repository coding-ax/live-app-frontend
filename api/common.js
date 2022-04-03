import instance from '../utils/api'
const baseUrl = 'https://live-cdn.xgpax.top';
const apiUrl = 'https://up-z2.qiniup.com/';

export const getUploadToken = () => {
    return instance.post('/upload');
}

export const file2qiniuCloud = async (file) => {
    uni.showLoading({
        title: '上传中'
    })
    try {
        const res = await getUploadToken();
        const { key, token } = res.data;
        const formData = {
            token,
            key,
        }
        const response = await uni.uploadFile({
            formData,
            url: apiUrl,
            name: 'file',
            filePath: file.url
        })
        const result = JSON.parse(response[1].data);
        if (!result.key) {
            uni.showToast({
                title: '上传失败',
                icon: 'none'
            })
        }
        return `${baseUrl}/${result.key}`;
    } catch (e) {
        uni.showToast({
            title: '上传失败',
            icon: 'none'
        })
    } finally {
        uni.hideLoading()
    }
    return ''
}

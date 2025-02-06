// 进行axios的二次封装
import axios from 'axios'
import {ElMessage} from "element-plus";
let request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
});
request.interceptors.request.use((config) => {
    // 拦截请求
    // 1.config配置对象
    // 2.必须返回config
    return config;
});
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let message = ''
    switch (error.response.status) {
        case 401:
            message = 'token过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现问题'
            break;
        default:
            message = '网络出现问题'
    }
    ElMessage({
        message: message,
        type: 'error'
    });
    return Promise.reject(error);
});
export default request;
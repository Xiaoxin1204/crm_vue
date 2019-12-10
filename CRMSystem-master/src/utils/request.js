import axios from 'axios'

const request = axios.create({
    // baseURL: '/dev-api',
    baseURL: 'https://bigyue.top/api',
    timeout: 5000, //  请求超时，毫秒值
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// http://localhost:8888/dev-api/db.json 加了基础路径
// request.get('/db.json').then(response => {
//     console.log(data)
// })

//导出自定义创建的 axios 对象
export default request
import axios from 'axios';

// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
// 部署打包的文件需要让这行生效
instance.defaults.baseURL = 'http://peterliang.top:8087'
//instance.defaults.baseURL = 'http://localhost.top:9090'
instance.interceptors.request.use(
  config => {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      // console.log('请求头加入token')
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    }

    return config

  },

  error => {
    return Promise.reject(error)
  })

//异步请求后，判断token是否过期
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error.response)
  }
)
export default instance;

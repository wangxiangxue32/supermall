import axios from 'axios'

export function request(config) {
  //1.创建 axios 实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    // baseURL: '数据接口请加微信 coderwhy003',
    timeout: 5000
  })

  //2.2 请求拦截
  instance.interceptors.request.use(config => {
    console.log(config);
    return config
  },err => {
    console.log(err);
  })

  //2.2 响应拦截
  instance.interceptors.response.use(res => {
    console.log(res);
    // res.data
    return res.data
  },err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)
}

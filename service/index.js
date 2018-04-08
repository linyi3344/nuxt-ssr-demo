import axios from 'axios'
// import { Message } from 'element-ui'

import qs from 'qs'
import config from './config'

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    // if (res.status !== 200) {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: res.data.msg
    //   })
    //   return Promise.reject(res)
    // }
    return res.data
  },
  error => {
    // if (error.response.status === 403) {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: '用户无权限访问数据，请联系管理员进行授权'
    //   })
    // } else {
    //   Message({
    //     showClose: true,
    //     type: 'warning',
    //     message: error.message
    //   })
    // }
    return Promise.reject(error)
  }
)

export default {
  post (url, data) {
    console.log('post request url', url)
    return service({
      method: 'post',
      url,
      params: data
    })
  },
  get (url, data) {
    console.log('get request url', url)
    return service({
      method: 'get',
      url,
      params: data
    })
  },
  delete (url, data) {
    console.log('delete request url', url)
    return service({
      methods: 'delete',
      url,
      params: data
    })
  }
}

/* eslint-disable */
import axios from 'axios'
import httpApi from './httpApi'

const axiosService = axios.create({
  timeout: 200000, // 设置超时时间为5s
})
// 添加请求拦截器
axiosService.interceptors.request.use(
  (config) => {
    //设置全局超时的请求次数，请求的间隙, 使用axios.defaults设置retry在响应拦截器中取不值, 现只能写死4次, 无法通过传值来覆盖
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// 下载导出订单
const downloadOrder = (res) => {
  // 更新token
  const blob = new Blob([res.data], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  if (res.data.type === 'application/json') {
    const reader = new FileReader()
    reader.addEventListener('loadend', (e) => {
      const resolveData = JSON.parse(e.target.result)
    })
    reader.readAsText(blob)
  } else {
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) //创建下载的链接
    downloadElement.href = href
    //获取文件名
    const fileName = new Date().getTime() + '.xlsx'
    downloadElement.download = fileName || 'download.xlsx' //下载后文件名
    document.body.appendChild(downloadElement)
    console.log(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
  }
}

// 添加响应拦截器
axiosService.interceptors.response.use(
  (res) => {
    const responseData = res.data
    // 下载导出订单
    if (res.config.responseType === 'blob') {
      downloadOrder(res)
      return responseData
    }
    return responseData
  },
  (error) => {
    return Promise.reject(error.response)
  },
)
export const http = (config) => {
  return new Promise((resolve, reject) => {
    // 请求方法等参数
    const requestData = httpApi.formatConfig(config)
    // 请求方法
    axiosService(requestData)
      .then((res) => {
        if (requestData.responseType === 'blob') {
          resolve(res)
        } else {
          const successCode = [200]
          if (res && successCode.includes(+res.code)) {
            if (res.data || res.data === false) {
              resolve(res.data)
            } else {
              resolve(res)
            }
          } else if (res && res.image) {
            resolve(res)
          } else if (res && res.name.indexOf('ZTZNFT') > -1) {
            resolve(res)
          } else {
            reject(res)
          }
        }
      })
      .catch((err) => {
        console.log('报错了', err)
        reject(err)
      })
  })
}
export default {
  install(Vue) {
    Vue.prototype.$axios = http
  },
}

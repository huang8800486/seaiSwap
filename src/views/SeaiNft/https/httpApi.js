/* eslint-disable */
import host from './httpHost'

export default {
  baseUrl: host.baseUrl,
  /**
   * 获取host
   */
  getPrefix() {
    let prefix = ''
    const protocol = location.protocol + '//' || 'https://'
    const host = location.host
    prefix = protocol + host
    return prefix
  },
  /**
   * 切换路线获取的域名
   */
  getHost() {
    // 开发环境
    if (process.env.NODE_ENV === 'production') {
      return this.getPrefix()
    }
    return this.baseUrl
  },
  /**
   * @param {Object} acHeaders  // 新增的请求头项
   * @returns {Object}  // axios请求头列表
   */
  formatHeaders(acHeaders) {
    // eslint-disable-next-line
    let headers = {}
    if (acHeaders) {
      for (const i in acHeaders) {
        headers[i] = acHeaders[i]
      }
    }
    return headers
  },

  /**
   * @param {Object} options  // 请求参数
   * @returns {Object}  // axios请求参数
   */
  formatConfig(options) {
    // 请求基本参数
    const defaults = {
      url: '', // 请求url
      method: 'GET', // 默认get方法
      headers: null, // 要添加的请求头
      data: null, // post请求参数
      params: null, // get请求参数
      cancelToast: false, //  取消报错提示
      responseType: false, // 下载类型
      isEmpty: false,
    }
    // 整理参数筛选
    const config = {}
    options = options || {}
    for (const key in defaults) {
      if (typeof options[key] !== 'undefined') {
        config[key] = options[key]
      } else {
        if (defaults[key]) {
          config[key] = defaults[key]
        }
      }
    }
    // 请求url
    const fullUrl = config.isEmpty ? config.url : `${this.getHost()}${config.url}`
    // 请求参数
    let requestData = {
      url: fullUrl,
      headers: this.formatHeaders(config.headers),
      method: config.method,
      cancelToast: config.cancelToast,
    }
    if (config.responseType) {
      requestData = Object.assign(requestData, { responseType: 'blob' })
    }
    // 判断是get还是post
    if (config.method.toUpperCase() === 'GET' && config.data) {
      requestData.params = config.data
    } else if (config.method.toUpperCase() === 'POST' && config.data) {
      requestData.data = config.data
    }
    return requestData
  },
}

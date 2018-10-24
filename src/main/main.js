import axios from 'axios'
import default_config from '../config'

function buildParams (paramsObject) {
  return Object.keys(paramsObject)
    .map(key => {
      var resultValue = paramsObject[key]

      if (typeof paramsObject[key] === 'object') {
        resultValue = JSON.stringify(paramsObject[key])
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(resultValue)}`
    })
    .join('&')
}

class API {
  constructor (config, parts) {
    this.apiUrl = ''
    this.hash = ''

    this.CONFIG = {
      ...default_config,
      ...config
    }
    this.apiUrl = this.CONFIG.apiUrl
    this.inject(parts)
  }

  async getHash () {
    return new Promise((res, rej) => {
      if (this.hash) {
        res(this.hash)
      }
      else {
        axios.post(`${this.apiUrl}user/auth`,
          buildParams({
            login: this.CONFIG.user.login,
            password: this.CONFIG.user.password
          })).then(({ data }) => res(data.hash)).catch(rej)
      }
    })

  }

  async request (action, params = {}, root) {
    this.hash = await this.getHash()

    if (this.hash) {
      params.hash = this.hash
    }

    return axios.post(`${this.apiUrl}${action}`,
      buildParams(params)).then(response => {
      let data = response.data
      return root ? data[root] : data
    })
  }

  inject (parts) {
    Object.keys(parts).map(part => {
      let module = parts[part]
      if (module) {
        Object.keys(module).map(method => {
          if (typeof module[method] === 'function') {
            module[method] = module[method].bind(this)
          }
        })
      }
    })

    Object.assign(API.prototype, parts)
  }
}

export default API

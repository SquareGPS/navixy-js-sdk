import axios from 'axios'
import default_config from '@/config'

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
        this.init(this.CONFIG)
        this.inject(parts)
    }

    init (config) {
        this.apiUrl = config.apiUrl

        return this.request('user/auth', {
            login: config.user.login,
            password: config.user.password
        }, 'hash', true).then(hash => {
            this.hash = hash
        })
    }

    request (action, params = {}, root, noAuth) {
        if (!this.hash && !noAuth) {
            return Promise.reject(new Error('auth-required'))
        }
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
import default_config from '@/config'
import axios from 'axios'
import { cloneDeepWith, template } from 'lodash'

function buildParams (paramsObject) {
    return Object.keys(paramsObject)
        .map(key => {
            let resultValue = paramsObject[key]

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
        this.hash = config && config.user && config.user.hash

        this.CONFIG = {
            ...default_config,
            ...config
        }
        this.apiUrl = template(this.CONFIG.apiUrl)(this.CONFIG)
        this.inject(parts)
    }

    setConfig (config) {
        this.CONFIG = {
            ...this.CONFIG,
            ...config
        }
        return this
    }

    setHash (hash) {
        this.hash = hash
        return this
    }

    setUser (user) {
        this.CONFIG.user = {
            ...this.CONFIG.user,
            ...user
        }
        return this
    }

    async getHash () {
        return new Promise((res, rej) => {
            if (this.hash) {
                res(this.hash)
            } else {
                if (!this.CONFIG.user) {
                    res('')
                    return
                }

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
        let modulesToInject = cloneDeepWith(parts, node => {
            if (typeof node === 'function') {
                return node.bind(this)
            }
        })

        Object.assign(this, modulesToInject)
    }
}

export default API

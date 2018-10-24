import api from './main/main'
import user from './resources/user'
import dealer from './resources/dealer'
import tracker from './resources/tracker'

const Navixy = {
    Api (config) {
        return new api(config, {
            user,
            tracker,
            dealer
        })
    }
}

module.exports = Navixy

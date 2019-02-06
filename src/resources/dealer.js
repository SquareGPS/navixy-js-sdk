function get_ui_config () {
    console.log(this.CONFIG)
    return this.request('dealer/get_ui_config', {
        domain: this.CONFIG.domain || location.host
    })
}

export default {
    get_ui_config
}

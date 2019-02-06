function list () {
    console.log(this)
    return this.request('tracker/list')
}

export default {
    list
}

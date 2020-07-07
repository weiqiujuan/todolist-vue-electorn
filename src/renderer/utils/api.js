import tools from '../model/tools';

function getData(urlApi, data, callback) {
    const url = tools.config.apiUrl + urlApi
    if (data) {
        this.$http.post(url, data).then((res) => {
            callback ? callback(res) : console.log(res)
        }).catch(error => {
            console.log(error)
        })
    } else {
        this.$http.get(url).then((res) => {
            callback ? callback(res) : console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

}

export {
    getData,
}
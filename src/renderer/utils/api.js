import tools from '../model/tools';

function getData(urlApi, data, callback) {
    const url = tools.config.apiUrl + urlApi
    this.$http.post(url, data).then((res) => {
        callback ? callback(res) : console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

export {
    getData,
}
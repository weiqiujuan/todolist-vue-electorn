/*import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

/!* eslint-disable no-new *!/
new Vue({
    components: {App},
    template: '<App/>'
}).$mount('#app')*/

import Vue from 'vue'
import store from './store/todo/store'
import App from './components/todo/App'

new Vue({
    store, // inject store to all children
    el: '#app',
    render: h => h(App)
})

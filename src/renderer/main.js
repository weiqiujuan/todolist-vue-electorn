import Vue from 'vue'

import App from './App'
import router from './router'
import axios from 'axios'
//import store from './store/todo/store'l


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueHighcharts from 'vue-highcharts';
import VueSocketIO from 'vue-socket.io'
import VueEcharts from 'v-charts'


Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.use(VueEcharts)

//引入socket.io配置连接
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://118.123.14.36:3000',
    vuex: {
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    components: {App},
    router,
    template: '<App/>'
}).$mount('#app')


/*import Vue from 'vue'
import store from './store/todo/store'
import todoApp from './components/todo/todoApp'

new Vue({
    store, // inject store to all children
    el: '#app',
    render: h => h(todoApp)
})*/

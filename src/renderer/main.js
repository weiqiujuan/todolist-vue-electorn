import Vue from 'vue'

import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import iview from 'iview';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighcharts from 'vue-highcharts';
import VueSocketIO from 'vue-socket.io'
import VueEcharts from 'v-charts'
import './assets/reset.css'

Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.use(VueEcharts)
Vue.use(iview)



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




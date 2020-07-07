import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: require('@/components/Home').default
        },
        {
            path: '/todayItem',
            name: 'todayItem',
            component: require('@/components/TodayItem').default
        },
        {
            path: '/diary',
            name: 'diary',
            component: require('@/components/Diary').default
        },
        {
            path: '/todoHistory',
            name: 'todoHistory',
            component: require('@/components/todoHistory').default
        },
        {
            path: '/todoAnaly',
            name: 'todoAnaly',
            component: require('@/components/todoAnaly').default
        },
        {
            path: '/todoAbout',
            name: 'todoAbout',
            component: require('@/components/todoAbout').default
        },
        {
            path: '/Sign',
            name: 'Sign',
            component: require('@/components/Sign').default
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
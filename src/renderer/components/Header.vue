<template>
    <div class="header">
        <p class="appName">TodoList桌面应用</p>
        <el-breadcrumb separator="|" class="header__tools">
            <el-breadcrumb-item>
                <router-link to='sign' v-model="login">{{login}}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a @click="logout">注销</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item @click='userState'><a>关于我</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>

</template>

<script>
    import tools from '../model/tools';
    import {eventBus} from "../../eventBus";
    import {getData} from "../utils/api";
    import {message} from "../utils/message";

    export default {
        name: "Header",
        data() {
            return {
                login: '登录',
                getData,
                message,
            }
        },
        created() {
            eventBus.$on('username', (params) => {
                this.login = params
            })
        },
        methods: {
            logoutCb(data) {
                console.log('退出登录',data)
                if (data.status === 200 && data.data.ret_code) {
                    this.login = '登录'
                    this.message(data.data.ret_msg, 'info')
                    this.$router.push({path: '/home'})
                } else {
                    this.message(data.data.ret_msg, 'warning')
                }
            },
            logout() {
                this.getData('logout', '', this.logoutCb)
            },
            userState() {
                eventBus.$emit('userState', this.login)
            },
            beforeDestroy() {
                eventBus.$off('username')
            }
        }
    }
</script>

<style scoped>
    .header {
        margin-top: 10px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
    }

    .appName {

    }

    .header__tools {
        margin-top: 10px;
    }
</style>
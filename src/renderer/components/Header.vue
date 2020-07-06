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

    export default {
        name: "Header",
        data() {
            return {
                login: '登录',
            }
        },
        created() {
            eventBus.$on('username', (params) => {
                this.login = params
            })
        },
        methods: {
            logout() {
                this.$http.get(tools.config.apiUrl + 'logout')
                    .then((response) => {
                        if (response.ret_code === 2) {
                            this.$message({
                                message: response.ret_msg,
                                type: 'warning'
                            })
                        } else {
                            this.login = '登录'
                            this.$message({
                                message: '退出登录成功',
                                type: 'info'
                            })
                            this.$router.push({path: '/home'})
                        }
                    }).catch(function (error) {
                    console.log(error)
                })
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
        display: flex;
        justify-content: space-between;
    }

    .appName {

    }

    .header__tools {
        margin-top: 10px;
    }
</style>
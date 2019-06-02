<template>
    <div class="header">
        <p style="float: left;text-align: center;padding-top:10px;font-size:14px;">TodoList桌面应用</p>
        <el-breadcrumb separator="|" class="breadcrumb">
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
                        //console.log(response)
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
                            this.$router.push({path:'/home'})
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
        position: relative;
    }

    .breadcrumb {
        padding: 10px;
        position: absolute;
        right: 10px;
    }
</style>
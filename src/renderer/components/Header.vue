<template>
    <div class="header">
        <p style="float: left;text-align: center;padding-top:10px;font-size:14px;">TodoList桌面应用</p>
        <el-breadcrumb separator="|" class="breadcrumb">
            <el-breadcrumb-item>
                <router-link to='sign' v-model="login">{{login}}</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a @click="destory">注销</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item><a>关于我</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>

</template>

<script>
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
            destory() {
                this.login='登录'
            }
        },
        beforeDestroy() {
            eventBus.$off('username')
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
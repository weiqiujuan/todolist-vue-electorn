<template>
    <div id="menu">
        <el-radio-group v-model="isCollapse" size="mini" fill="#eee" text-color="black"
                        style="position: relative;left: 40px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location-outline"></i>
                    <span slot="title"><router-link to="home">TodoList</router-link></span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <i class="el-icon-time"></i>
                        <router-link to="home">todoList</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2" @click="userState()">
                        <i class="el-icon-tickets"></i>
                        <router-link to="todayItem" >今日详情</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3" @click="userState()">
                        <i class="el-icon-date" ></i>
                        <router-link to="diary">日历</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="userState()">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="todoHistory">Todo历史</router-link></span>
            </el-menu-item>
            <el-menu-item index="3" @click="userState()">
                <i class="el-icon-document"></i>
                <span slot="title"><router-link to="todoAnaly">Todo分析</router-link></span>
            </el-menu-item>
            <el-menu-item index="4" @click="userState()">
                <i class="el-icon-setting"></i>
                <span slot="title"><router-link to="todoAbout">关于todo</router-link></span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {eventBus} from "../../eventBus"; 

    export default {
        name: "Menu",
        data() {
            return {
                isCollapse: false,
                state:'登录'
            }
        },
        created() {
            eventBus.$on('username', (params) => {
                this.state = params
            })
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            },
            userState(){
                if(this.state=='登录'){
                        alert('操作此模块请登录')
                        this.$router.push({name:'home'})
                    }
                
            }
        }
    }
</script>

<style scoped>

    /*.el-menu-vertical-demo:not(.el-menu--collapse) {
        height: 735px;
    }*/


</style>
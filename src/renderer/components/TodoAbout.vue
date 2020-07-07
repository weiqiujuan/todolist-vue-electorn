<template>
    <div class="todoAbout">
        <!--        <p class="aboutTitle">todoList桌面应用介绍</p>-->
        <el-carousel indicator-position="outside" height="450px">
            <el-carousel-item v-for="(item,index) in aboutApp" :key="index" class="el-carousel__item">
                <img :src="item.src" width="750px" height="450px"/>
            </el-carousel-item>
        </el-carousel>
        <div class="icon">
            <el-button type="info" @click="openFile()">
                <!--<a href="https://www.wjx.cn/jq/39328343.aspx">用户体验调查</a>-->
                用户体验调查
            </el-button>
        </div>
    </div>
</template>

<script>
    import imgs from '../../../static/json/json.json'
    import {shell} from 'electron'

    export default {
        name: "todoAbout",
        data() {
            return {
                aboutApp: imgs.images
            }
        },
        methods: {
            openFile() {
                shell.openExternal('https://www.wjx.cn/jq/39328343.aspx')
            }
        }
    }
</script>

<style scoped>
    .todoAbout {

    }

    .aboutTitle {
        margin-top: 30px;
        text-align: center;
        width: 100%;
        font: 30px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 100;
        text-rendering: optimizeLegibility;
    }

    .el-carousel {
        margin-top: 30px;
    }

    .el-carousel__item {
        width: 750px;
        height: 450px;
        border-radius: 15px;
        left: 80px;
    }

    .el-carousel__item img {
        text-align: center;
        color: #475669;
        font-size: 18px;
        line-height: 500px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .icon {
        position: relative;
        left: 85%;
        bottom: 20%;
    }
</style>
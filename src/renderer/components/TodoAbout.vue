<template>
    <div class="todoAbout">
        <p class="aboutTitle">todoList桌面应用介绍</p>
        <el-carousel indicator-position="outside" height="450px">
            <el-carousel-item v-for="(item,index) in aboutApp" :key="index" class="el-carousel__item">
                <img :src="item.src" width="750px" height="450px"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import imgs from '../../../static/json/json.json'

    export default {
        name: "todoAbout",
        data() {
            return {
                aboutApp: imgs.images
            }
        }
    }
</script>

<style scoped>
    .todoAbout {

    }

    .aboutTitle {
        text-align: center;
        width: 100%;
        font-size: 30px;
        font-weight: 100;
        color: #565656;
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

    .el-carousel {
        margin-top: 30px;
    }

    .el-carousel__item {
        width: 750px;
        height: 450px;
        border-radius: 15px;
        left: 50px;
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
</style>
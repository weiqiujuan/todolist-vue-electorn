<template>
    <div class="header">
        <p style="float: left;text-align: center;padding-top:10px;font-size:14px;">TodoList桌面应用</p>
        <el-breadcrumb separator="|" class="breadcrumb">
            <el-breadcrumb-item><router-link to='Sign'>登陆</router-link></el-breadcrumb-item>
            <el-breadcrumb-item>
                <a>注销</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item><a>关于我</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>

</template>

<script>
    export default {
        name: "Header",
        methods: {}
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
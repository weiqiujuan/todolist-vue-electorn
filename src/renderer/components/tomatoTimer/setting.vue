<template>
    <div class="tomato-setting-block">
        <el-input type="text" v-model="workDuration" :number=true placeholder="工作时长"/>
        <el-input type="text" v-model="restDuration" :number=true placeholder="休息时长"/>
        <el-button type="primary" v-on:click="save">保存</el-button>
    </div>
</template>

<script>
    import {eventBus} from "../../../eventBus";

    export default {
        name: "setting",
        data() {
            return {
                workDuration: 25,
                restDuration: 5
            }
        },
        methods: {
            save: function () {
                let workDuration = this.workDuration;
                let restDuration = this.restDuration;
                let Duration={
                    workDuration:this.workDuration,
                    restDuration:this.restDuration,
                }
                eventBus.$emit('setting',Duration)
                console.log(Duration)
                alert('保存成功,设置工作时间为' + workDuration + '分钟,休息时间为' + restDuration+'分钟')
            }
        }
    }
</script>

<style scoped>
    .tomato-setting-block {
        width: 300px;
        text-align: right;
    }

    .tomato-setting-block .el-input,
    .tomato-setting-block .el-button {
        margin-bottom: 10px;
    }

</style>
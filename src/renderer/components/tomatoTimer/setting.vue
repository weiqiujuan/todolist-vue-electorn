<template>
    <div class="tomato-setting-block">
        <el-input type="text" v-model="workDuration" :number=true placeholder="工作时长"/>
        <el-input type="text" v-model="restDuration" :number=true placeholder="休息时长"/>
        <el-button type="primary" v-on:click="save">保存</el-button>
    </div>
</template>

<script>

    import {Setting} from './model';
    import {optionsDefault} from './state';

    export default {
        name: "setting",
        data() {
            return {
                workDuration: optionsDefault.workDuration,
                restDuration: optionsDefault.restDuration
            }
        },
        beforeMount() {
            let setting = this.$service.tomato.getSetting();
            if (setting) {
                this.workDuration = setting.workDuration;
                this.restDuration = setting.restDuration;
            }
        },
        methods: {
            save: function () {
                let setting = new Setting(this.workDuration, this.restDuration);
                this.$service.tomato.saveSetting(setting);
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
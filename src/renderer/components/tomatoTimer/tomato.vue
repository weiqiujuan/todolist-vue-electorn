<template>
    <div style="height: auto;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="番茄计时" name="work">
                <CountDown v-bind:workDuration="setting.workDuration" v-bind:restDuration="setting.restDuration" />
            </el-tab-pane>
            <el-tab-pane label="工作记录" name="history">
                <History/>
            </el-tab-pane>
            <el-tab-pane label="时间设置" name="setting">
                <Setting/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import CountDown from './countDown.vue';
    import History from './history.vue';
    import Setting from './setting.vue';

    export default {
        name: "tomato",
        components: {
            CountDown,
            History,
            Setting
        },
        data() {
            return {
                activeName: 'work'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        computed: {
            setting: function () {
                let setting = this.$service.tomato.getSetting();
                return setting;
            }
        }
    }
</script>

<style scoped>

</style>
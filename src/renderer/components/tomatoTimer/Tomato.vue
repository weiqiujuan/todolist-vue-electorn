<template>
    <div class="tomato">
        <el-tabs v-model="activeName">
            <el-tab-pane label="番茄计时" name="work">
                <CountDown/>
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
    import CountDown from './CountDown';
    import History from './History';
    import Setting from './Setting';

    let setting;
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
        computed: {
            setting: function () {
                setting = this.$service.tomato.getSetting();
                return setting;
            }
        }
    }
</script>

<style scoped>
    .tomato{
        padding-left: 5px;
    }
</style>
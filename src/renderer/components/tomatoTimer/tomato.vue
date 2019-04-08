<template>
    <div style="height: auto;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="番茄计时" name="work">
                <CountDown/>
            </el-tab-pane>
            <el-tab-pane label="工作记录" name="history">
                <history/>
            </el-tab-pane>
            <el-tab-pane label="时间设置" name="setting">
                <Setting/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import CountDown from './countDown';
    import History from './history';
    import Setting from './setting';

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
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        computed:{
            setting:function(){
                setting = this.$service.tomato.getSetting();
                return setting;
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="tomato-block">
        <p class="title">tomato timer</p>
        <div class="circle">
            <i-circle v-bind:percent="percent" :size=360 class="circle-png">
                <span class="circle-time">{{timeStr}}</span>
            </i-circle>
            <el-input v-model="content" type="textarea" placeholder="请输入您要完成的任务..."/>
        </div>
        <div class="btn-group">
            <el-button type="success" v-on:click="startWork">开始工作</el-button>
            <el-button type="warning" v-on:click="stop">停止</el-button>
            <el-button type="info" v-on:click="startRest">休息</el-button>
        </div>
    </div>
</template>
<script>
    import {eventBus} from "../../../eventBus";
    import {getData} from "../../utils/api";

    export default {
        name: 'CountDown',
        data() {
            return {
                percent: 0,
                timeStr: '25:00',
                timeIndex: null,
                content: '计时工作',
                workDuration: 25,
                restDuration: 5,
                startTime: null,
                endTime: null,
                state: null,
                countData: {},
                getData
            };
        },
        created() {
            eventBus.$on('setting', (params) => {
                this.workDuration = parseInt(params.workDuration);
                this.restDuration = parseInt(params.restDuration);
            })
        },
        methods: {
            startWork() {
                this.percent = 100;
                this.timeStr = this.workDuration + ":00";
                let workTime = this.workDuration * 60;
                this.durationPro(workTime);
                alert('开始工作啦，加油呦')
                this.startTime = (new Date()).toLocaleString()
            },
            startRest() {
                this.percent = 100;
                this.timeStr = "0" + this.restDuration + ":00";
                let restTime = this.restDuration * 60;
                this.durationPro(restTime);
                alert('工作幸苦啦，放松一下');
                this.startTime = (new Date()).toLocaleString();
                this.content = '休息一下下';
            },
            stop() {
                alert('确定停止工作？')
                this.endTime = (new Date()).toLocaleString()
                this.state = '未完成'
                window.clearInterval(this.timeIndex);
                this.timeIndex = null;
                this.loadData();
            },
            durationPro(time) {
                let increase = 0, step = 2;
                if (this.timeIndex) {
                    window.clearInterval(this.timeIndex);
                }
                this.timeIndex = window.setInterval(() => {
                    increase++;
                    if (increase > time) { //时间到点
                        this.percent = 0;
                        window.clearTimeout(this.timeIndex);
                        alert("恭喜你，完成一个任务")
                        this.endTime = (new Date()).toLocaleString()
                        this.state = '完成'
                        this.loadData();
                        return;
                    }
                    this.timeStr = this.secondToTime(time - increase);
                    if (!(increase % step)) { //不应该算百分比
                        return;
                    }
                    let tmp = increase / time * 100;
                    this.percent = 100 - tmp;
                }, 1000);
            },
            secondToTime(time) {
                let minute = Math.floor(time / 60) % 60,
                    second = time % 60;
                return (minute >= 10 ? minute : '0' + minute)
                    + ":" + (second >= 10 ? second : '0' + second);
            },
            loadData() {
                this.countData = {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    content: this.content,
                    state: this.state
                }
                this.getData('saveTomatoData', this.countData)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tomato-block {
        position: relative;
        margin: 0 auto;

        .title {
            text-align: center;
            font-size: 25px;
            font-weight: bold;
            line-height: 50px;
        }

        .btn-group {
            text-align: center;
            margin-top: 10px;

            &:first-child {
                position: relative;
                left: 50%;
                transform: translateX(50%);
            }
        }

        .circle {
            position: relative;
            margin-left: 30%;
            margin-right: 180px;
        }

        .circle-time {
            font-size: 120px;
            position: absolute;
            left: 8%;
            top: 43%;
        }
    }
</style>
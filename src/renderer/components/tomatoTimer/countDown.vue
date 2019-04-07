<template>
    <div class="tomato-block">
        <p class="title">tomato timer</p>
        <div class="circle">
            <i-circle v-bind:percent="percent" :size=360>
                <span class="circle-time">{{timeStr}}</span>
            </i-circle>
<!--
            <el-input v-model="content" type="textarea" placeholder="请输入您要完成的任务..."/>
-->
        </div>
        <div class="btn-group">
            <el-button type="success" v-on:click="startWork">开始工作</el-button>
            <el-button type="warning" v-on:click="stop">停止</el-button>
            <el-button type="info" v-on:click="startRest">休息</el-button>
        </div>
    </div>
</template>
<script>
    import {TYPE} from './keys';
    import dom from './dom';
    import {popInfo} from './state';

    export default {
        name: 'countDown',
        data() {
            return {
                percent: 0,
                timeStr: '00:00',
                timeIndex: null,
                currentRecord: null,
                content: null
            };
        },
        props: {
            workDuration: {
                type: Number,
                default: 25
            },
            restDuration: {
                type: Number,
                default: 5
            }
        },
        methods: {
            startWork() {
                // 750 / 1500 * 100
                //this.percent += 10;
                this.percent = 100;
                this.timeStr = this.workDuration + ":00";
                let workTime = this.workDuration * 60;
                this.durationPro(workTime);
                this.$service.tomato.start(TYPE.work, workTime, this.content);
            },
            startRest() {
                this.percent = 100;
                this.timeStr = "0" + this.restDuration + ":00";
                let restTime = this.restDuration * 60;
                this.durationPro(restTime);
                this.$service.tomato.start(TYPE.rest, restTime, "休息时间");
            },
            stop() {
                this.$service.tomato.stop(false);
                window.clearInterval(this.timeIndex);
                this.timeIndex = null;
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
                        this.$service.tomato.stop(true);
                        window.clearTimeout(this.timeIndex);
                        dom.setTitle(popInfo.complete);
                        dom.alert(popInfo.complete);
                        return;
                    }
                    this.timeStr = this.secondToTime(time - increase);
                    dom.setTitle(popInfo.runtime + this.timeStr);
                    if (!(increase % step)) { //不应该算百分比
                        return;
                    }
                    let tmp = increase / time * 100;
                    this.percent = 100 - tmp;
                }, 1000);
            },
            secondToTime(time) {
                let hour = Math.floor(time / 3600),
                    minute = Math.floor(time / 60) % 60,
                    second = time % 60;
                return (minute >= 10 ? minute : '0' + minute)
                    + ":" + (second >= 10 ? second : '0' + second);
            }
        }
    }
</script>
<style>
    .tomato-block {
        margin: 0px auto;
        width: 400px;
    }

    .tomato-block .title {
        text-align: center;
        margin-right: 50px;
        font-size: 25px;
        font-weight: bold;
        line-height: 50px;
    }

    .tomato-block .btn-group {
        text-align: center;
        margin-top: 10px;
    }

    .tomato-block .btn-group button + button {
        margin-left: 5px;
    }

    .tomato-block .btn-group button:first-child {
        margin-left: -50px;
    }

    .tomato-block .circle-time {
        font-size: 120px;
        position: absolute;
        top: 50%;
        left: 30%;
    }
</style>
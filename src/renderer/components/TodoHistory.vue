<template>
    <div class="historyPage">
        <div class="history">
            <span class="demonstration">请选择要查询的日期: </span>
            <el-date-picker
                    v-model="valueTime"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-button icon="el-icon-search" circle @click="inSearch()"/>
        </div>
        <div class="historylist">
            <el-timeline>
                <el-timeline-item placement="top" v-for="(activity, index) in activities"
                                  :timestamp="activity.date" :key="index">
                    <el-card style="opacity: 0.7">
                        <ol class="content-item">
                            <li v-for="(item,index) in activity.todo" :key="index">
                                {{item}}
                            </li>
                        </ol>
                        <ol class="content-remarks">
                            <li v-for="(remark,index) in activity.remarks" :key="index">
                                <el-button type="info" size="mini" plain>{{remark}}</el-button>
                            </li>
                        </ol>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import {getData} from "../utils/api";

    export default {
        name: "todoHistory",
        components: {},
        data() {
            return {
                getData,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            this.pickTime(picker, 3600 * 1000 * 24 * 7)
                        }
                    }, {
                        text: '最近三天',
                        onClick(picker) {
                            this.pickTime(picker, 3600 * 1000 * 24 * 7)
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            this.pickTime(picker, 3600 * 1000 * 24)
                        }
                    }],
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                valueTime: '',
                activities: [{
                    todo: ['react第三章学习', 'react项目重构', 'react视屏查找', '参加聚会'],
                    date: '2018-06-02',
                    remarks: ['完成', '未完成', '未完成', '已取消'],
                }, {
                    todo: ["拍照", "解决冲突", "react第四章学习"],
                    date: '2018-06-01',
                    remarks: ['未完成', '完成', '完成']
                }, {
                    todo: ["router学习", "修图片", "还书", "react学习"],
                    date: '2018-05-31',
                    remarks: ['已取消', '完成', '已取消', '完成']
                }]
            }
        },
        methods: {
            pickTime(picker, time) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - time);
                picker.$emit('pick', [start, end]);
            },
            getDataCb(res) {
                let data = [];
                (res.data).map(item => {
                    let itemTodo = item.todo;
                    let todoData = [], todoState = [];
                    itemTodo.map(item => {
                        todoData.push(item.todo)
                        switch (parseInt(item.state)) {
                            case 1:
                                item.state = '未完成';
                                break;
                            case 2:
                                item.state = '已完成'
                                break;
                            default:
                                item.state = '已取消'
                        }
                        todoState.push(item.state)
                    });
                    let dayData = {
                        date: item.date,
                        todo: todoData,
                        remarks: todoState,
                    }
                    data.push(dayData)
                })
                this.activities = data
            },
            inSearch() {
                let time = this.valueTime;
                if (!time) {
                    alert('请选择或输入所要查询的时间');
                }
                let postData = {
                    startTime: time[0],
                    endTime: time[1],
                }
                this.getData('historyApi', postData, this.getDataCb)
            }
        }
    }
</script>

<style scoped>
    .history {
        text-align: center;
        margin-bottom: 15px;
    }

    .demonstration {
        font-size: 20px;
        line-height: 30px;
        color: gray;
        letter-spacing: 1px;
    }

    .content-item {
        margin: 0 15px;
        line-height: 35px;
        float: left;
    }

    .content-remarks {
        list-style-type: none;
        margin: 0 10px;
        clear: right;
        position: absolute;
        left: 80%;
    }

    .content-remarks li {
        padding: 3px 5px;
    }
</style>
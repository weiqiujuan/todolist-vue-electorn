<template>
    <div class="analyPage">
        <el-row>
            <el-col :span="14">
                <el-button @click="changeType" type="info">切换图表类型</el-button>
                <ve-chart :data="chartData" :settings="chartSettings" width="500px"></ve-chart>
                <p style="text-align: center">todos任务量趋势图</p>
            </el-col>
            <el-col :span="10">
                <ve-pie :data="pieChartData" :settings="pieChartSettings"></ve-pie>
                <p style="text-align: center">todos任务完成状态百分比</p>
            </el-col>
        </el-row>
        <div class="pageLink">
            <el-button-group>
                <router-link to="todoHistory">
                    <el-button type="info" icon="el-icon-arrow-left">上一页</el-button>
                </router-link>
                <router-link to="todoAbout">
                    <el-button type="info">下一页<i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                </router-link>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    import {getData} from "../utils/api";

    export default {
        name: "todoAnaly",
        data() {
            this.typeArr = ['line', 'histogram', 'pie',]
            this.index = 0
            return {
                chartData: {
                    columns: ['Date', 'Todos'],
                    rows: [
                        {'Date': '1月1日', 'Todos': 1523},
                        {'Date': '1月2日', 'Todos': 1223},
                        {'Date': '1月3日', 'Todos': 2123},
                        {'Date': '1月4日', 'Todos': 4123},
                        {'Date': '1月5日', 'Todos': 3123},
                        {'Date': '1月6日', 'Todos': 7123}
                    ]
                },
                chartSettings: {type: this.typeArr[this.index]},
                pieChartData: {
                    columns: ['状态', '备注'],
                    rows: [{'状态': '完成', '备注': 0.5},
                        {'状态': '未完成', '备注': 0.2},
                        {'状态': '已取消', '备注': 0.3}]
                },
                pieChartSettings: {dataType: 'percent'},
                getData,
            }
        },
        beforeMount() {
            this.getChartData()
        },
        methods: {
            historyApiCb(res) {
                let data = [], len = 0, complete = 0, actived = 0, des = 0;
                (res.data).map(item => {
                    let itemTodo = item.todo;
                    len += itemTodo.length;
                    let itemData = {
                        'Date': item.date,
                        'Todos': itemTodo.length
                    }
                    data.push(itemData);
                    itemTodo.map(item => {
                        let eItem = item.state;
                        if (parseInt(eItem) === 1) {
                            complete++
                        } else if (parseInt(eItem) === 0) {
                            actived++
                        } else des++
                    });
                })
                console.log(actived, complete, des, len)
                this.chartData.rows = data
                this.pieChartData.rows = [{'状态': '已完成', '备注': complete / len},
                    {'状态': '未完成', '备注': actived / len},
                    {'状态': '已取消', '备注': des / len}]
            },
            getChartData() {
                let daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    daysMonth[1] = 29;
                }
                let year = new Date().getFullYear();
                let month = new Date().getMonth() + 1;
                let date = new Date().getDate()
                let startTime, endTime;
                month = month < 10 ? ('0' + month) : month;

                if (date < 7) {
                    let startMonth = month - 1;
                    let startDate = daysMonth[month - 1] - Math.abs(date - 5);

                    date = date < 10 ? ('0' + date) : date;
                    startMonth = startMonth < 10 ? ('0' + startMonth) : startMonth;

                    startTime = year + '-' + startMonth + '-' + startDate;
                    endTime = year + '-' + month + '-' + date;
                } else {
                    let startDate = (date - 6) < 10 ? ('0' + (date - 6)) : (date - 6);
                    date = date < 10 ? ('0' + date) : date;

                    startTime = year + '-' + month + '-' + startDate;
                    endTime = year + '-' + month + '-' + date;
                }

                let postData = {
                    startTime: startTime,
                    endTime: endTime,
                }
                this.getData('historyApi', postData, this.historyApiCb)
            },
            changeType: function () {
                this.index++
                if (this.index >= this.typeArr.length) {
                    this.index = 0
                }
                this.chartSettings = {type: this.typeArr[this.index]}
            }
        }
    }
</script>

<style scoped>
    .analyPage {
        margin: 20px 10px;
    }

    .pageLink {
        position: relative;
        left: 80%;
        top: 87%;
    }

    .el-button {
        opacity: 0.5
    }
</style>
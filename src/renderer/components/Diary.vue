<template>
    <div class="diaryPage">
        <!--<ve-pie :data="chartData" ></ve-pie>-->
        <div class="calendar">
            <div class="calendar__header">
                <div class="header__arrow header__pre" @click="handlePreMonth"></div>
                <div class="header__title">{{Year}}年{{Month+1}}月{{date}}日</div>
                <div class="header__arrow header__next" @click="handleNextMonth"></div>
            </div>
            <div class="calendar__main">
                <div class="main__block-header" v-for="(item,index) in calendarHeader" :key="index">{{item}}</div>
                <div :class="`main__block ${(item.type==='pre'||item.type==='next')?'main__block-not':''} ${(item.content === date && item.type === 'normal') && 'main__block-today'}`"
                     v-for="(item,index) in displayDaysPerMonth(Year)[Month]" :key="item.type+item.content+`${index}`"
                     @click="handleDayClick(item)"
                >
                    {{item.content}}
                </div>
            </div>
        </div>


        <div class="diolg">
            <el-card class="box-card">
                <div>{{Year}}-{{Month+1}}-{{date}}</div>
                <div v-for="(item,index) in list" :key="index" class="text item">
                    {{'列表内容 ' + item }}
                </div>
            </el-card>

            <ve-pie :data="chartData" style="margin-top: 10px;" :settings="chartSettings"></ve-pie>

        </div>

    </div>
</template>

<script>
    import tools from '../model/tools.js';

    export default {
        name: "diary",
        components: {},

        data() {
            this.chartSettings = {
                dataType: 'percent'
            }
            return {
                list: ['vue', 'todo', 'list'],
                Year: new Date().getFullYear(),
                Month: new Date().getMonth(),
                date: new Date().getDate(),
                calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
                chartData: {
                    columns: ['状态', '备注'],
                    rows: [
                        {'状态': '完成', '备注': 1},
                        {'状态': '未完成', '备注': 0.7},
                        {'状态': '已取消', '备注': 0.79}
                    ]
                },
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                let api = tools.config.apiUrl + 'historyApi'
                let dataTime = this.Year + '-' + (this.Month+1) + '-' + this.date
                this.$http.post(api, {
                    start_time: dataTime,
                    end_time: '',
                }).then((response) => {
                    console.log(response)
                    //this.list=response.todos;
                })
            },
            handleDayClick(item) {
                if (item.type === 'normal') {
                    this.date = Number(item.content)
                }
                this.getDataList();
            },
            displayDaysPerMonth(year) {
                //每个月的天数，如果闰年，二月为29天
                let daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    daysMonth[1] = 29;
                }

                //前一个月
                let daysPreMonth = [].concat(daysMonth)
                daysPreMonth.unshift(daysPreMonth.pop())

                let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
                    //获得星期数
                    let day = new Date(year, index, 1).getDay();
                    if (day === 0) {
                        return 6;
                    } else {
                        return day - 1;
                    }
                })
                console.log(addDaysFromPreMonth)


                let total_calendar_list = new Array(12).fill([]).map((month, monthIndex) => {
                    let addDays = addDaysFromPreMonth[monthIndex] + 1,
                        daysCount = daysMonth[monthIndex],
                        daysCountPre = daysPreMonth[monthIndex],
                        monthDate = [];
                    if (addDays >= 7) {
                        addDays = addDays - 1;
                    }

                    for (; addDays > 0; addDays--) {
                        let obj = {
                            content: daysCountPre--,
                            type: 'pre'
                        }
                        monthDate.unshift(obj)
                    }

                    for (let i = 0; i < daysCount;) {
                        let obj = {
                            content: ++i,
                            type: 'normal'
                        }
                        monthDate.push(obj)
                    }

                    if (monthDate.length > 35) {
                        for (let i = 42 - monthDate.length, j = 0; j < i;) {
                            let obj = {
                                content: ++j,
                                type: "next"
                            };

                            monthDate.push(obj);
                        }
                    } else {
                        for (let i = 35 - monthDate.length, j = 0; j < i;) {
                            let obj = {
                                content: ++j,
                                type: "next"
                            };

                            monthDate.push(obj);
                        }
                    }
                    return monthDate;
                })
                return total_calendar_list;
            },
            handlePreMonth() {
                if (this.Month === 0) {
                    this.Year = this.Year - 1;
                    this.Month = 11;
                    this.date = 1;
                } else {
                    this.Month = this.Month - 1
                    this.date = 1
                }
            },
            handleNextMonth() {
                if (this.Month === 11) {
                    this.Year = this.Year + 1;
                    this.Month = 0;
                    this.date = 1;
                } else {
                    this.Month = this.Month + 1
                    this.date = 1
                }
            }
        },
    }
</script>

<style scoped>
    .diaryPage {
        display: flex;
    }

    .diolg {
        margin: 0px 15px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding: 14px;
    }

    .box-card {
        width: 420px;
    }

    .calendar {
        flex-shrink: 0;
        width: 94.6vw;
        height: 560px;
        max-width: 435px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 0 20px 0;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
    }

    .calendar__header {
        color: #2c3135;
        font-size: 18px;
        width: 403.2px;
        display: flex;
        align-self: center;
        justify-content: space-between;
        line-height: 22px;
        margin-top: 17px;
    }

    .header__title {
        font-size: 18px;
        letter-spacing: 1px;
    }

    .header__arrow {
        height: 12px;
        width: 12px;
        position: relative;

    }

    .header__arrow:after {
        content: " ";
        display: inline-block;
        height: 9px;
        width: 9px;
        border-width: 2px 2px 0 0;
        border-color: #c8c8cd;
        border-style: solid;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 2px;
    }

    .header__pre {
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
    }

    .header__next {
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    }

    .calendar__main {
        width: 84vw;
        max-width: 403.2px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-top: 19px;
    }

    .main__block-header, .main__block {
        width: 11.8vw;
        height: 11.8vw;
        max-width: 56.32px;
        max-height: 56.32px;
        margin-bottom: 15px;
        border-radius: 2px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main__block-header {
        color: #7f8fa4;
        background-color: #fff;
        flex-shrink: 0;
    }

    .main__block {
        color: #666666;
        background-color: #fff;
        flex-shrink: 0;
        box-shadow: 0px 0px 0px #666666;
        position: relative;
    }

    .main__block-not {
        background-color: #edf2f5;
        color: #7f8fa4;
    }

    .main__block-today {
        transition: 0.5s all;
        background-color: #f93d3a;
        color: #fff;
        box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
    }


</style>
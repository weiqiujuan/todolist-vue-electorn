<template>
    <div class="diaryPage">
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
            <el-card class="box-card" style="opacity: 0.5;">
                <div>{{Year}}-{{Month+1}}-{{date}}</div>
                <div v-for="(item,index) in list" :key="index" class="text item">
                    <li>{{item}}</li>
                </div>
            </el-card>

            <ve-pie :data="chartData" style="margin-top: 10px;"
                    :settings="chartSettings"></ve-pie>

        </div>
    </div>
</template>

<script>
    import {eventBus} from "../../eventBus";
    import {getData} from '../utils/api'

    export default {
        name: "diary",
        components: {},

        data() {
            this.chartSettings = {
                dataType: 'percent'
            }
            return {
                list: ['vue', 'react', 'electron'],
                state: [0, 1, 2],
                Year: new Date().getFullYear(),
                Month: new Date().getMonth(),
                date: new Date().getDate(),
                calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
                completedCount: 0,
                activeCount: 0,
                desCount: 0,
                chartData: {
                    columns: ['状态', '备注'],
                    rows: [{'状态': '完成', '备注': 0.5},
                        {'状态': '未完成', '备注': 0.2},
                        {'状态': '已取消', '备注': 0.3}]
                },
                getData,
            }
        },
        created() {
            eventBus.$on('userState', (params) => {
                if (params === '登录') {
                    console.log(params)
                    alert('操作此模块请登录')
                    this.$router.push({name: 'home'})
                }
            })
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                let month = this.Month + 1;
                month = month < 9 ? ('0' + month) : month;
                let date = this.date;
                date = date < 10 ? ('0' + date) : date;
                let dataTime = this.Year + '-' + month + '-' + date;
                this.getData('diaryApi',{date:dataTime},this.getDiaryData)
            },
            getDiaryData(res){
                let data = res.data.todo;
                this.list = [];
                this.state = [];
                data.map((item) => {
                    this.list.push(item.todo);
                    this.state.push(item.state);
                })
                this.count();
            },
            count() {
                let len = this.state.length;
                this.state.map((item) => {
                    if (item === 0) {
                        this.completedCount += 1;
                    } else if (item === 1) {
                        this.activeCount += 1;
                    } else {
                        this.desCount += 1
                    }
                })
                this.chartData.rows = [{'状态': '完成', '备注': this.completedCount / len},
                    {'状态': '未完成', '备注': this.activeCount / len},
                    {'状态': '已取消', '备注': this.desCount / len}]
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
                    //获取指定年月的1号都是周几
                    let day = new Date(year, index, 1).getDay();
                    if (day === 0) {
                        return 6;
                    } else {
                        return day - 1;
                    }
                })

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
        padding: 5px;
    }

    .box-card {
        width: 420px;
    }

    .calendar {
        color: #000;
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
        opacity: 0.7;
        box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
    }

    .calendar__header {
        color: #2c3135;
        font-size: 18px;
        width: 403px;
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
        background-color: #7f8fa4;
        opacity: 0.6;
        box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
    }


</style>
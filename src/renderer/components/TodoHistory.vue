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
            <el-button icon="el-icon-search" circle @click="inSearch()"></el-button>
        </div>
        <div class="historylist">
            <el-timeline>
                <el-timeline-item placement="top" v-for="(activity, index) in activities"
                                  :timestamp="activity.timestamp" :key="index">
                    <el-card>
                        <ol class="content-item">
                            <li v-for="(item,index) in activity.content" :key="index">{{item}}</li>
                        </ol>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import tools from '../model/tools.js';

    export default {
        name: "todoHistory",
        components: {},
        data() {
            return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                valueTime: '',

                activities: [{
                    content: ['vue', 'react', '1018-10-34', 'vue', 'react', '1018-10-34'],
                    timestamp: '2018-04-03',
                    remarks: [],
                }, {
                    content: ['2018-04-12 ', 'todos'],
                    timestamp: '2018-04-12',
                }, {
                    content: ['魏秋娟 ', 'todos'],
                    timestamp: '2018-04-15',
                }]
            }
        },
        methods: {
            inSearch() {
                let time = this.valueTime;
                if (!time) {
                    alert('请选择或输入要查询的时间段');
                }
                let start_time = time[0];
                let end_time = time[1];

                console.log(start_time, end_time)

                let api = tools.config.apiUrl + 'historyApi'

                this.$http.post(api,  {
                    start_time: start_time,
                    end_time: end_time,
                }).then((response) => {
                    console.log(response)
                    /*this.activities.timestamp = response.date;
                    this.activities.content = response.todos;*/
                })

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
        /* font-family: arial,"Hiragino Sans GB","Microsoft Yahei",sans-serif;*/
        font-size: 20px;
        line-height: 30px;
        color: gray;
        letter-spacing: 1px;
    }

    .content-item {
        margin: 0 20px;
        line-height: 25px;
    }
</style>
<template>
    <div class="tomato-history">
        <el-button @click="resetDateFilter">清除数据</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="startTime"
                    label="开始时间"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    label="结束时间"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="todo任务"
                    width="200"
                    :filters="[{ text: '计时工作', value: '计时工作' }, { text: '休息一下下', value: '休息一下下' }]"
                    :filter-method="filterContent">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    width="120"
                    :filters="[{ text: '完成', value: '完成' }, { text: '未完成', value: '未完成' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.state === '完成' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.state}}</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import tools from '../../model/tools.js';

    export default {
        name: 'history',
        data() {
            return {
                tableData: [{
                    startTime: '2016-05-02',
                    endTime: '2016-05-02',
                    content: '王小虎',
                    state: '完成'
                }]

            }
        },
        beforeMount(){
            let api = tools.config.apiUrl + 'findTomatoData'
            this.$http.get(api).then((response) => {
                this.tableData=response.data
            })
        },
        methods: {
            resetDateFilter() {
                let api = tools.config.apiUrl + 'deleteTomatoData'
                this.$http.get(api)
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.state === value;
            },
            filterContent(value, row) {
                return row.content === value;
            }
        }
    }
</script>
<style scoped>
    .tomato-history .row-info td {
        background: #f8f8f9;
        color: #657180;
    }
    .tomato-history .row-err td {
        background: #bbbec4;
        color: #fff;
    }
    .tomato-history .state-cell .run {
        margin-left: 10px;
    }
    .tomato-history .state-cell .run.undone {
        color: #ed3f14;
    }
</style>
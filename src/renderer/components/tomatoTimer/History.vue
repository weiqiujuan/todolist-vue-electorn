<template>
    <div class="tomato-history">
        <el-button @click="resetDateFilter">清除数据</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                            disable-transitions>{{scope.row.state}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="edit"
                    label="编辑"
                    width="120"
            >
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle
                               @click.native.prevent="deleteRow(scope.$index, tableData)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;margin-left: -5px">
            <el-pagination align='center'
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[6,1,10]"
                           :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {getData} from "../../utils/api";

    export default {
        name: 'History',
        data() {
            return {
                tableData: [{
                    startTime: '2016-05-02',
                    endTime: '2016-05-02',
                    content: '王小虎',
                    state: '完成'
                }],
                currentPage: 1,
                total: 20,
                pageSize: 6,
                getData,
            }
        },
        //定时刷新
        mounted() {
            if (this.timer) {
                clearInterval(this.timer)
            } else {
                this.timer = setInterval(() => {
                    //获取数据
                    this.loadData()
                }, 600)
            }
        },
        //组件销毁时清除
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            resetDateFilter() {
                this.loadData()
            },
            loadData() {
                this.getData('findTomatoData', '', (res) => {
                    this.tableData = res.data
                })
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.state === value;
            },
            filterContent(value, row) {
                return row.content === value;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            }
        }
    }
</script>
<style scoped>
</style>
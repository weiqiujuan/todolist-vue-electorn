<template>
    <div class="analyPage">
        <el-button @click="changeType" type="info" style="opacity: 0.5">切换图表类型</el-button>
        <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    </div>
</template>

<script>
    export default {
        name: "todoAnaly",
        data() {
            this.typeArr = ['line', 'histogram', 'pie',]
            this.index = 0
            return {
                chartData: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        {'日期': '1月1日', '访问用户': 1523},
                        {'日期': '1月2日', '访问用户': 1223},
                        {'日期': '1月3日', '访问用户': 2123},
                        {'日期': '1月4日', '访问用户': 4123},
                        {'日期': '1月5日', '访问用户': 3123},
                        {'日期': '1月6日', '访问用户': 7123}
                    ]
                },
                chartSettings: {type: this.typeArr[this.index]}
            }
        },
        methods: {
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
</style>
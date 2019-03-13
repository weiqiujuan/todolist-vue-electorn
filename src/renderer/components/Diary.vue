<template>
    <div class="diaryPage">
        <ve-pie :data="chartData" ></ve-pie>
    </div>
</template>

<script>
    import tools from '../model/tools.js';

    export default {
        name: "diary",
        components: {},

        data () {
            return {
                chartData: {
                    columns: ['状态', '备注'],
                    rows: [
                        { '状态': '完成', '备注': 100},
                        { '状态': '未完成', '备注': 100},
                        { '状态': '已取消', '备注': 79}
                    ]
                }
            }
        },
        mounted() {

        },
        methods: {},
    }
</script>

<style scoped>

</style>
<template>
    <div style="width: auto">
        <el-container :style="{'height':winHeight+'px'}">
            <el-aside style="width: 250px;height: auto;position: absolute;left: 0;">
                <Menu/>
            </el-aside>
            <el-container style="width:750px;">
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import todoApp from './components/todo/todoApp'
    import store from './store/todo/store'
    import Menu from './components/Menu'

    export default {
        name: 'todolist',
        components: {Menu},

        data() {
            return {
                winHeight: document.documentElement.clientHeight
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            }
        },
        mounted() {
            window.addEventListener('online', function () {
                console.log('有网络了')
            })
            window.addEventListener('offline', function () {
                const option = {
                    title: '提示!',
                    body: '网络连接已断开，请检查网络设置'
                }
                const myNotification = new window.Notification(option.title, option)
                myNotification.onClick = () => {
                    console.log('点击了')
                }
            })

            //监听右键菜单
            window.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                //给主进程广播事件，注意this的指向

                this.$electron.ipcRenderer.send('contextmenu')
            })
            window.onresize = () => {
                this.winHeight = document.documentElement.clientHeight;
            }
        }
    }
</script>

<style>
    body > .el-container {
        margin-bottom: 40px;
    }
</style>

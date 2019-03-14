<template>
    <div style="width: auto" class="todoApp">
        <el-container>
            <el-aside style="position: relative;left:0;padding-top: 8px;opacity: 0.6">
                <Menu/>
            </el-aside>
            <el-container>
                <el-header style="background-color:#eee; opacity: 0.7;height:35px;">
                    <Header/>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    import Menu from './components/Menu'
    import Header from './components/Header'

    export default {
        name: 'todolist',
        components: {Menu, Header},

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


<style lang="scss">
    * {
        margin: 0;
        padding: 0;

    }
    .todoApp{
        background-image: url("../../static/leaves.png");
        width: 1335px;
        height: 735px;
        background-size: cover;
        z-index: 111;
    }

    .el-aside {
        width: 200px !important;
        //background: #eee;
        a {
            color: #333;
            text-decoration: none;
        }
        .el-menu {
         //  background: #eee;
        }
    }

    .el-container {
        // padding:10px;
        width: 100%;
    }

    .main-content {
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px;
    }

    .content {
        width: 100%;
    }


</style>

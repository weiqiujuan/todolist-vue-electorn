<template>
    <div class="todoApp">
        <div class="aside">
            <Menu/>
        </div>
        <div class="container">
            <Header class="container_head"/>
            <div class="container_main">
                <router-view></router-view>
            </div>
        </div>
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
    .todoApp {
        width: 100%;
        height: 100%;
        display: flex;
        background-image: url("../../static/leaves.png");
        background-size: cover;
        z-index: 111;
    }

    .aside{
        flex: 1;
    }
    .container {
        flex: 5;
        overflow: scroll;
        .container_head{
            position: sticky;
        }
    }

</style>

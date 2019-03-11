<template>
    <div class="sign content">
        <!-- 登录页面 -->
        <el-dialog title="登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                   :center="true" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item>
                    <el-input v-model="userinfo.username" placeholder="用户名：admin"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="userinfo.password" placeholder="密码：123456"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button style="width:80%" type="primary" @click="doLogin()">确 定</el-button>
            </div>
        </el-dialog>
        <todo-app/>
    </div>
</template>

<script>
    import tools from '../model/tools';
    import {eventBus} from "../../eventBus";
    import todoApp from './todo/todoApp';
    import store from '../store/todo/store';

    export default {
        name: "sign",
        data() {
            return {
                dialogFormVisible: true,
                userinfo: {},
            }
        },
        store,
        components: {
            todoApp
        },
        //渲染之前
        beforeMount() {
            tools.storage.remove('userinfo');
            //判断是否登陆
            let userinfo = tools.storage.get('userinfo')
            if (userinfo) {
                this.dialogFormVisible = true;
            } else {
                this.dialogFormVisible = false;
            }
        },
        methods: {
            doLogin() {
                if (this.userinfo.username && this.userinfo.password) {
                    this.$http.post(tools.config.apiUrl + 'login', {
                        username: this.userinfo.username,
                        password: this.userinfo.password
                    }).then((response) => {
                        response = response.data;
                        console.log(response)
                        if (response) {
                            //保存用户信息
                            //tools.storage.set('userinfo', response.login);
                            this.userinfo.username = response.login.username
                            console.log(this.userinfo.username)
                            this.dialogFormVisible = false;
                            this.todo();
                        } else {
                            this.$message({
                                message: response.message,
                                type: 'warning'
                            })
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.$message({
                        message: '用户密码不能为空',
                        type: 'warning'
                    })
                }
            },
            todo() {
                eventBus.$emit('username', this.userinfo.username)
            }
        }
    }
</script>

<style scoped>

</style>
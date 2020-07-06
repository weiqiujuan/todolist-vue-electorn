<template>
    <div class="sign content">
        <!-- 登录页面 -->
        <el-dialog title="登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                   :center="true" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item>
                    <el-input v-model="userInfo.username" placeholder="用户名：admin"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="userInfo.password" placeholder="密码：11111"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doLogin()">确 定</el-button>
            </div>
        </el-dialog>
        <todo-app/>
    </div>
</template>

<script>
    import {eventBus} from "../../eventBus";
    import todoApp from './todo/TodoApp';
    import store from '../store/todo/store';
    import {getData} from '../utils/api'
    import {message} from '../utils/message'

    export default {
        name: "Sign",
        data() {
            return {
                dialogFormVisible: true,
                userInfo: {},
                getData,
                message
            }
        },
        store,
        components: {
            todoApp
        },
        //渲染之前
       /* beforeMount() {
            tools.storage.remove('userInfo');
            //判断是否登陆
            let userInfo = tools.storage.get('userInfo')
            if (userInfo) {
                this.dialogFormVisible = true;
            } else {
                this.dialogFormVisible = false;
            }
        },*/
        methods: {
            doLogin() {
                if (this.userInfo.username && this.userInfo.password) {
                    this.getData('login',this.userInfo,this.dataCb);
                } else {
                    this.message('用户名或密码不能为空','warning')
                }
            },
            dataCb(res){
                res = res.data;
                console.log(res)
                if (res.ret_code===0) {
                    this.dialogFormVisible = false;
                    this.message(res.ret_msg,'info')
                    this.todo();
                } else {
                    this.message(res.ret_msg,'warning')
                }
            },
            todo() {
                eventBus.$emit('username', this.userInfo.username)
            }
        }
    }
</script>

<style scoped>

</style>
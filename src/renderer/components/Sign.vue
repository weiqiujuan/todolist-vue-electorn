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
    </div>
</template>

<script>
    import tools from '../model/tools'

    export default {
        name: "Sign",
        data() {
            return {
                dialogFormVisible: false,
                userinfo: {}
            }
        },
        //渲染之前
        beforeMount() {
            //判断是否登陆
            let userinfo = tools.storage.get('userinfo')
            if (userinfo) {
                this.dialogFormVisible = false;
            } else {
                this.dialogFormVisible = true;
            }
        },
        methods: {
            doLogin() {
                //获取用户名和密码
                //请求api接口实现登陆
                //eg：先借用别人的http://www.apiying.com/yuqing/index.php?m=Api&a=log

                if (this.userinfo.username && this.userinfo.password) {
                    this.$http.post(tools.config.apiUrl + 'index.php?m=Api&a=login', {
                        username: this.userinfo.username,
                        password: this.userinfo.password
                    }).then((response) => {
                        response = response.data;
                        if (response.success) {
                            tools.storage.set('userinfo', response.result);
                            this.dialogFormVisible = false;
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
            }

        }

    }
</script>

<style scoped>

</style>
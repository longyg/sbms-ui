<template>
  <el-form
    :model="loginForm"
    :rules="fieldRules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <span class="tool-bar"></span>
    <h2 class="title" style="padding-left: 22px">系统登录</h2>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span="12">
        <el-form-item prop="validationCode">
          <el-input
            type="test"
            v-model="loginForm.validationCode"
            auto-complete="off"
            placeholder="验证码，单击图片刷新"
            style="width:100%"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item>
          <img style="width: 99%" class="pointer" :src="loginForm.src" @click="refreshCaptcha" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 48%" @click.native.prevent="reset">重置</el-button>
      <el-button
        type="primary"
        style="width: 48%"
        @click.native.prevent="login"
        :loading="loading"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import mock from '@/mock/index.js'
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        username: "admin",
        password: "admin",
        captcha: "",
        src: "",
      },
      fieldRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: true,
    };
  },
  methods: {
    login() {
      this.loading = true;
      let userInfo = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        captcha: this.loginForm.captcha,
      };
      this.$api.login
        .login(userInfo)
        .then((res) => {
          if (res.msg != null) {
            this.$message({ message: res.msg, type: "error" });
          } else {
            Cookies.set("token", res.data.token);
            sessionStorage.setItem("user", userInfo.username);
            this.$router.push("/");
          }
          this.loading = false;
        })
        .catch((res) => {
          this.$message({ message: res.message, type: "error" });
        });
    },
    refreshCaptcha() {
      this.loginForm.src =
        this.global.baseUrl + "/kaptcha.jpg?t=" + new Date().getTime();
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },
  },
  mounted() {
    this.refreshCaptcha();
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
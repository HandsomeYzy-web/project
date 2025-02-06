<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" xs="24">
        <el-form class="login_form">
          <h1>hello</h1>
          <h2>欢迎来到yy便利店</h2>
          <el-form-item>
            <el-input placeholder="请输入账号" :prefix-icon="User" v-model="loginForm.userId" size="large"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="请输入密码" :prefix-icon="Lock" v-model="loginForm.password" show-password size="large"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User,Lock } from '@element-plus/icons-vue'
import { reactive } from "vue";
let loginForm = reactive({
  userId: '',
  password: ''
})
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
.login_form {
  position: relative;
  width: 60%;
  top: 30vh;
  background: rgba(253, 253, 253, 0.5); // 半透明黑色遮罩
  backdrop-filter: blur(5px); // 背景模糊效果
  padding: 40px;
  border-radius: 20px;
  h1 {
    font-size: 40px;
    color: #fff;
  }
  h2 {
    font-size: 20px;
    color: #fff;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}

</style>
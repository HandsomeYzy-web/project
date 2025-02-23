<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rulers" ref="loginForms">
          <h1>hello</h1>
          <h2>欢迎来到yy便利店</h2>
          <el-form-item prop="userId">
            <el-input placeholder="请输入账号" :prefix-icon="User" v-model="loginForm.userId" size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" :prefix-icon="Lock" v-model="loginForm.password" show-password size="large"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="login" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User,Lock } from '@element-plus/icons-vue'
import { reactive,ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRouter,useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";

const useStore = useUserStore();
let loading = ref(false);
let loginForms = ref(false);
let $router = useRouter();
let $route = useRoute();
let loginForm = reactive({
  userId: '',
  password: ''
});
const login = async () => {
  try {
    await loginForms.value.validate();
    loading.value = true;
    await useStore.userLogin(loginForm);
    let redirect = $route.query.redirect;
    $router.push({path: redirect || '/'});
    ElNotification({
      title: `HI,${getTime()}`,
      message: '欢迎回来',
      type: 'success',
    });
  } catch (error) {
    ElNotification({
      title: '登录失败',
      message: error.message,
      type: 'error',
    });
  } finally {
    loading.value = false;
  }
};
const validatorUserId = (rule: any, value: string, callback: any) => {
  if(/^\d{6,11}$/.test(value)) {
    callback();
  } else {
    callback(new Error('请输入5-10位纯数字账号'));
  }
};
const validatorPassword = (rule: any, value: string, callback: any) => {
  if(/^\w{6,20}$/.test(value)) {
    callback();
  } else {
    callback(new Error('请输入6-20位密码'));
  }
};
const rulers = {
  userId: [
    {trigger: 'change', validator: validatorUserId}
  ],
  password: [
    {trigger: 'change', validator:validatorPassword}
  ]
};
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
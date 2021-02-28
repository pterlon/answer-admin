<template>
  <div class="login">
    <div class="login-box">
      <h2 class="title">答题系统管理员后台</h2>
      <div class="form">
        <div class="form-item">
          <span class="text">手机号：</span>
          <div class="input">
            <el-input placeholder="请输入手机号" :minlength="11" :maxlength="11" v-model="phone"></el-input>
          </div>
        </div>
        <div class="form-item">
          <span class="text">密码：</span>
          <div class="input">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          </div>
        </div>
        <div class="form-item">
          <div class="btns">
            <el-button type="primary" size="small" :loading="loading" @click="toLogin">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Input,
    Button,
  } from 'element-ui';
  import { toLogin } from '@/api/request'
  export default {
    name: "Login",
    components: {
      'ElInput': Input,
      'ElButton': Button,
    },
    data() {
      return {
        phone: '',
        password: '',
        loading: false,
      }
    },
    methods: {
      toLogin() {
        if (this.loading || this.phone.length !== 11) return;
        this.loading = true;
        toLogin(this.phone, this.password).then(({data}) => {
          this.$router.replace('/create');
          this.$store.commit('init', data);
        }).finally(() => {
          this.loading = false;
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100vh;
    position: relative;
    .login-box {
      position: absolute;
      top: 50%;
      right: 100px;
      transform: translateY(-50%);
      width: 400px;
      height: 300px;
      background-color: #fff;
      box-shadow: 0px 0px 4px 2px #e8e8e8;
      box-sizing: border-box;
      padding: 10px 15px;
      .title {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
      }
      .form-item {
        margin-top: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        justify-content: center;
        .text {
          width: 60px;
          margin-right: 10px;
        }
        .input {
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
</style>
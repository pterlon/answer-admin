<template>
  <div class="app" v-if="login">
    <header class="header">
      <div class="logo">
        <img src="" alt="">
      </div>
      <ul class="router-list">
        <li class="routes" :class="{active: isactive(item.to)}" v-for="item in routerList" :key="item.to">
          <router-link :to="item.to">{{item.title}}</router-link>
        </li>
      </ul>
    </header>
    <div class="content">
      <router-view/>
    </div>
  </div>
  <div class="app" v-else>
    <router-view/>
  </div>
</template>

<script>
  import { islogin } from '@/utils/mixins/islogin'
  export default {
    name: "App",
    components: {},
    mixins: [islogin],
    data() {
      return {
        routerList: [
          { to: '/create', title: '创作' },
          { to: '/audit', title: '审核' },
        ]
      }
    },
    methods: {
      isactive(path) {
        return this.$route.path === path;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./assets/css/base.css";
  .app {
    @import url('http://at.alicdn.com/t/font_2194746_334e6ijl1jx.css');
    width: 100vw;
    height: 100vh;
    background-color: #f2f3f5;
    display: flex;
    flex-direction: column;
    .header {
      height: 50px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0px 100px;
      display: flex;
      align-items: center;
      .logo {
        width: 35px;
        height: 35px;
        margin-right: 15px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #f2f3f5;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .router-list {
        display: flex;
        align-items: center;
        .routes {
          padding: 0 15px;
          &.active {
            color: #5754fd;
          }
        }
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      box-sizing: border-box;
      padding: 15px 10px;
    }
  }
</style>
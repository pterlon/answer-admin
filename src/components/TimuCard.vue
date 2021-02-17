<template>
  <el-card shadow="hover" :body-style="bodyStyle">
    <div class="top" v-if="timu.name">{{timu.name}}</div>
    <div class="top" v-else>
      <img :src="timu.img" alt="">
    </div>
    <div class="others">
      <p class="creater">
        <span>创建者：</span>
        <img :src="timu.avatar" alt="" class="avatar">
        <span class="nickname">{{timu.nickname}}</span>
      </p>
      <div class="btns">
        <button class="look" @click="lookTimu">查看</button>
        <button @click="insertTimu">添加</button>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { Card } from 'element-ui'
  export default {
    name: "TimuCard",
    components: {
      'ElCard': Card,
    },
    data() {
      return {}
    },
    props: {
      timu: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    computed: {
      bodyStyle() {
        return {
          padding: '10px'
        }
      },
    },
    methods: {
      lookTimu() {
        this.$emit('look', this.timu);
      },
      insertTimu() {
        this.$emit('insert', this.timu);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .top {
    padding-bottom: 4px;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 5px;
    font-size: 12px;
    img {
      width: 60%;
    }
  }
  .others {
    display: flex;
    align-items: center;
    .creater {
      font-size: 12px;
      color: #ccc;
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
      .avatar {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
      }
      .nickname {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    button {
      font-size: 12px;
      margin-left: 10px;
      padding: 1px 10px;
      border: none;
      background-color: #5754fd;
      color: #fff;
      border-radius: 4px;
      &.look {
        background-color: #42b983;
      }
    }
  }
</style>
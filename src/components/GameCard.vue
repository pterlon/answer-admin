<template>
  <el-card shadow="hover" :body-style="bodyStyle">
    <div class="top">
      <p class="status">
        <button :class="{
          end: game.status === 5,
          doing: game.status === 1,
          before: game.status === 2,
          submit: game.status === 4
        }">
          {{statusMap[game.status]}}
        </button>
      </p>
      <p class="name">{{game.rname}}</p>
      <p class="createtime">{{time}}</p>
    </div>
    <p class="desc">{{game.description}}</p>
    <div class="bottom">
      <p>预约人数：{{game.reservation_num}}人</p>
      <p>参与人数：{{0}}人</p>
    </div>
  </el-card>
</template>

<script>
  import { Card } from 'element-ui'
  export default {
    name: "GameCard",
    components: {
      'ElCard': Card,
    },
    data() {
      return {
        statusMap: {
          1: '进行中',
          2: '未开始',
          4: '未审核',
          5: '已审核'
        }
      }
    },
    props: {
      game: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      bodyStyle() {
        return {
          padding: '5px 10px',
          cursor: 'pointer',
        }
      },
      time() {
        let time = new Date(this.game.starttime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = this.fullZero(time.getHours());
        let minutes = this.fullZero(time.getMinutes());
        let seconds = this.fullZero(time.getSeconds());
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      },
    },
    methods: {
      fullZero(num) {
        let str = num.toString();
        if (str.length === 1) {
          str = 0 + str;
        }
        return str;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/init";
  .top {
    height: 30px;
    border-bottom: 1px solid #e8e8e8;
    font-size: 12px;
    display: flex;
    align-items: center;
    .status {
      margin-right: 5px;
      button {
        padding: 0 5px;
        border-radius: 4px;
        color: #fff;
        &.end {
          background-color: #e8e8e8;
          color: #ccc;
        }
        &.before {
          background-color: #3fe391;
        }
        &.doing {
          background-color: transparent;
          background-image: linear-gradient(247deg, #00adff, #0089ff 35%, #2a2aff);
        }
        &.submit {
          background-color: #5754fd;
        }
      }
    }
    .name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .createtime {
      flex: 1;
      overflow: hidden;
      color: #ccc;
      text-align: right;
    }
  }
  .desc {
    padding: 5px 0;
    @include toEllipse(2);
    font-size: 13px;
    border-bottom: 1px solid #e8e8e8;
  }
  .bottom {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #ababab;
    p {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-of-type(1) {
        margin-right: 5px;
      }
    }
  }
</style>
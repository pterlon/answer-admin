<template>
  <div class="look-timu">
    <div class="timu-name">
      <p class="title">题目</p>
      <p class="name" v-if="timu.name">{{timu.name}}</p>
      <div class="timu-img" v-else>
        <img :src="timu.img" alt="">
      </div>
    </div>
    <div class="timu-options" v-if="!isFills">
      <p class="title">选项</p>
      <ul class="options">
        <li
          :class="{item: true, active: timu.res.includes(item)}"
          v-for="(item,i) in timu.options"
          :key="item"
        >
          <div class="round">{{formatOptions(i)}}</div>
          <div class="text">{{item}}</div>
        </li>
      </ul>
    </div>
    <div class="res" v-if="!isFills">
      <p class="title">正确选项</p>
      <p class="res">{{formatRes(timu.res)}}</p>
      <p class="title">解析</p>
      <p class="desc">{{timu.description}}</p>
    </div>
    <div class="res-json" v-else>
      <p class="title">正确选项</p>
      <div class="res">
        <div class="res-item" v-for="item in timu.res_count" :key="item">
          <span>第{{item}}个空的答案：</span>
          <span>{{timu.res_json[item-1].join('、')}}</span>
        </div>
      </div>
      <p class="title">解析</p>
      <p class="desc">{{timu.description}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LookTimu",
    components: {},
    data() {
      return {}
    },
    props: {
      timu: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      isSingle() {
        return this.timu.res?.length === 1;
      },
      isFills() {
        return !!this.timu.res_json;
      },
      isMultis() {
        return !this.isSingle && !this.isFills;
      },
    },
    methods: {
      formatOptions(index) {
        return String.fromCharCode(65 + index);
      },
      formatRes(arr) {
        return arr.map(item => {
          let index = this.timu.options.findIndex(opt => opt === item);
          return this.formatOptions(index);
        }).join('');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .look-timu {
    .title {
      margin-bottom: 3px;
      font-size: 12px;
      color: #ccc;
    }
    .timu-name {
      margin-bottom: 10px;
      .name {
        text-align: justify;
      }
      .timu-img {
        display: flex;
        justify-content: center;
        img {
          width: 50%;
        }
      }
    }
    .timu-options {
      margin-bottom: 10px;
      .item {
        min-height: 30px;
        border: 1px solid #d2d2d2;
        border-radius: 4px;
        display: flex;
        align-items: center;
        background-color: #dedede;
        margin-bottom: 10px;
        font-size: 15px;
        &.active {
          background-color: #5754fd;
          color: #fff;
        }
        .round {
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        .text {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
      }
    }
    .res {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .desc {
      text-align: justify;
      margin-bottom: 5px;
    }
  }
</style>
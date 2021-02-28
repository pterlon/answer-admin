<template>
  <div class="create-view">
    <div class="timu-list">
      <div class="my-tabs">
        <tabs v-model="currtab" :tablist="['单选题', '多选题', '填空题']"/>
      </div>
      <div class="content">
        <div :key="type">
          <ul class="timus" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <li class="item" v-for="item in list" :key="item.name">
              <timu-card :timu="item" @look="lookTimu" @insert="insertTimu"/>
            </li>
          </ul>
        </div>
        <p class="loading" v-if="isloading">加载中</p>
        <p class="finished" v-if="isfinished">加载完成</p>
      </div>
    </div>
    <div class="create-operation">
      <create-timu @finished="finished"/>
    </div>
    <div class="craeted-timus">
      <created-list/>
    </div>
    <el-dialog
      :visible.sync="islook"
      append-to-body
    >
      <look-timu :timu="currTimu"/>
    </el-dialog>
  </div>
</template>

<script>
  import Tabs from "@/components/Tabs";
  import TimuCard from "@/components/TimuCard";
  import LookTimu from "@/components/LookTimu";
  import CreateTimu from "@/views/create/CreateTimu";
  import CreatedList from "@/views/create/CreatedList";
  import { Dialog } from 'element-ui'
  import { getAllTimus } from '@/api/request'
  export default {
    name: "CreateView",
    components: {
      Tabs,
      TimuCard,
      'ElDialog': Dialog,
      LookTimu,
      CreateTimu,
      CreatedList,
    },
    data() {
      return {
        currtab: 0,
        activeTimu: 0,
        singles: {
          list: [],
          start: 0,
          limit: 10,
          loading: false,
          isfinish: false,
        },
        multis: {
          list: [],
          start: 0,
          limit: 10,
          loading: false,
          isfinish: false,
        },
        fills: {
          list: [],
          start: 0,
          limit: 10,
          loading: false,
          isfinish: false,
        },
        type: 'singles',
        islook: false,
        currTimu: null,
      }
    },
    watch: {
      currtab(val) {
        this.type = val === 0 ? 'singles' : (val === 1 ? 'multis' : 'fills');
      },
    },
    computed: {
      isloading() {
        return this[this.type].loading;
      },
      isfinished() {
        return this[this.type].isfinish;
      },
      disabled () {
        return this.isloading || this.isfinished;
      },
      list() {
        return this[this.type].list;
      },
    },
    methods: {
      load () {
        let type = this.type;
        this[type].loading = true
        getAllTimus(type, this[type].start, this[type].limit).then(({data}) => {
          if (data.length < this[type].limit) {
            this[type].isfinish = true;
          }
          this[type].list.push(...data);
          this[type].start += data.length;
          this[type].loading = false
        })
      },
      lookTimu(timu) {
        this.islook = true;
        this.currTimu = timu;
      },
      insertTimu(timu) {
        this.$store.commit('setCreatedTimu', timu);
      },
      finished() {
        let obj = {
          list: [],
          start: 0,
          limit: 10,
          loading: false,
          isfinish: false,
        }
        this.singles = { ...obj }
        this.multis = { ...obj }
        this.fills = { ...obj }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .create-view {
    height: 100%;
    display: flex;
    .timu-list {
      width: 350px;
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .my-tabs {
        height: 40px;
      }
      .content {
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
        padding: 5px 10px;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .item {
          margin-bottom: 10px;
        }
        .loading, .finished {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .create-operation {
      flex: 1;
      overflow: hidden;
      margin: 0 20px;
      background-color: #fff;
      border-radius: 4px;
    }
    .craeted-timus {
      width: 300px;
      background-color: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 10px;
    }
  }
</style>
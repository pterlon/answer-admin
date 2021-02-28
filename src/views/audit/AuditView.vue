<template>
  <div class="audit-view">
    <div class="left-content">
      <ul class="audit-list" v-infinite-scroll="load" :infinite-scroll-disabled="loading || isfinish">
        <li class="audit-item" v-for="game in list" :key="game.rankid">
          <game-card :game="game" @click.native="toGameDetail(game)"/>
        </li>
      </ul>
      <p class="loading" v-if="loading">加载中</p>
      <p class="finished" v-if="isfinish">加载完成</p>
    </div>
    <div class="operations">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import GameCard from "@/components/GameCard";
  import AuditGame from "@/views/audit/AuditGame";
  import { getAuditGame } from '@/api/request'
  export default {
    name: "AuditView",
    components: {
      GameCard,
      AuditGame,
    },
    data() {
      return {
        list: [],
        start: 0,
        limit: 10,
        loading: false,
        isfinish: false,
      }
    },
    methods: {
      load() {
        this.loading = true;
        getAuditGame(this.start, this.limit).then(({data}) => {
          this.list.push(...data);
          this.loading = false;
          if (data.length < this.limit) {
            this.isfinish = true;
          }
          this.start += data.length;
        })
      },
      toGameDetail(game) {
        this.$router.replace({
          name: 'AuditGame',
          query: {
            id: game.rankid
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .audit-view {
    height: 100%;
    display: flex;
    .left-content {
      width: 350px;
      height: 100%;
      background-color: #fff;
      border-radius: 4px;
      margin-right: 15px;
      box-sizing: border-box;
      padding: 8px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      .audit-list {
        padding: 2px;
        .audit-item {
          margin-bottom: 10px;
        }
      }
      .loading, .finished {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .operations {
      flex: 1;
      overflow-x: hidden;
      box-sizing: border-box;
    }
  }
</style>
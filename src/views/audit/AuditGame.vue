<template>
  <div class="audit-game">
    <div class="game-info">
      <div class="top-title">
        <p class="game-name">挑战赛信息</p>
      </div>
      <div class="info">
        <p class="game-name">{{game.rname}}</p>
        <p class="game-desc">
          <span class="title">简介:</span>
          <span class="desc">{{game.description}}</span>
        </p>
        <ul class="game-data">
          <li class="game-data-item">
            <div class="content">
              <p class="title">预约人数</p>
              <p class="num">{{game.reservation_num}}人</p>
            </div>
          </li>
          <li class="game-data-item">
            <div class="content">
              <p class="title">参与人数</p>
              <p class="num">{{game.join_num}}人</p>
            </div>
          </li>
          <li class="game-data-item">
            <div class="content">
              <p class="title">开始时间</p>
              <p class="num">{{formatTime(game.starttime)}}</p>
            </div>
          </li>
          <li class="game-data-item">
            <div class="content">
              <p class="title">结束时间</p>
              <p class="num">{{formatTime(game.endtime)}}</p>
            </div>
          </li>
          <li class="game-data-item">
            <div class="content">
              <p class="title">获奖数量</p>
              <p class="num">{{game.winning_count}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="winning">
      <div class="top-title">
        <p class="game-name">获奖信息</p>
      </div>
      <div class="content">
        <winning-list :list="rankList" :game="game" @finishSend="asyncGetRankList"/>
      </div>
    </div>
    <div class="rank">
      <div class="top-title">
        <p class="game-name">排名信息</p>
      </div>
      <rank-list-charts :list="allData"/>
      <winning-list :list="allData" :game="game" isall/>
    </div>
  </div>
</template>

<script>
  import { getGameById, getRankRewards } from '@/api/request';
  import WinningList from "@/views/audit/WinningList";
  import RankListCharts from "@/components/RankListCharts";
  export default {
    name: "AuditGame",
    components: {
      WinningList,
      RankListCharts,
    },
    data() {
      return {
        game: {},
        rankList: [],
        allData: [],
      }
    },
    watch: {
      '$route.query.id': {
        handler(val) {
          let id = parseInt(val);
          if (id) {
            getGameById(id).then(res => {
              this.game = res.data;
            })
            this.asyncGetRankList();
          }
        },
        immediate: true,
      }
    },
    methods: {
      fullZero(num) {
        let str = num.toString();
        if (str.length === 1) {
          str = 0 + str;
        }
        return str;
      },
      formatTime(str) {
        let time = new Date(str);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        return `${year}-${month}-${date} ${this.fullZero(hours)}:${this.fullZero(minutes)}:${this.fullZero(seconds)}`;
      },
      asyncGetRankList() {
        getRankRewards(this.$route.query.id, 0, 3).then(res => {
          this.rankList = res.data;
        })
        getRankRewards(this.$route.query.id).then(res => {
          this.allData = res.data;
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .audit-game {
    height: 100%;
    overflow: auto;
    .game-info {
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 20px;
      .top-title {
        margin-bottom: 10px;
        .game-name {
          padding-left: 10px;
          border-left: 4px solid #5754fd;
          font-weight: 600;
          font-size: 20px;
        }
      }
      .info {
        padding: 0 15px;
        .game-name {
          font-size: 18px;
          margin-bottom: 5px;
        }
        .game-desc {
          margin-bottom: 5px;
          .title {
            color: #ccc;
          }
          .desc {
            margin-left: 5px;
            text-align: justify;
          }
        }
        .game-data {
          padding: 10px 0;
          display: flex;
          .game-data-item {
            width: 20%;
            margin: 0 20px;
            &:nth-of-type(1) {
              margin-left: 0;
            }
            &:nth-last-of-type(1) {
              margin-right: 0;
            }
            .content {
              background-color: #fff;
              box-shadow: 0px 0px 4px 2px #e8e8e8;
              border-radius: 4px;
              overflow: hidden;
              box-sizing: content-box;
              padding: 10px;
              .title, .num {
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .num {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .winning {
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 20px;
      .top-title {
        margin-bottom: 10px;
        .game-name {
          padding-left: 10px;
          border-left: 4px solid #5754fd;
          font-weight: 600;
          font-size: 20px;
        }
      }
    }
    .rank {
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      .top-title {
        margin-bottom: 10px;
        .game-name {
          padding-left: 10px;
          border-left: 4px solid #5754fd;
          font-weight: 600;
          font-size: 20px;
        }
      }
    }
  }
</style>
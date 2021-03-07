<template>
  <el-table
      :data="listTableData"
      size="small"
      style="width: 100%">
    <el-table-column :fixed="!isall" prop="index" label="排名" width="70">
      <template slot-scope="{ $index }">
        <div class="rank-index">
          <img class="rank-icon" :src="formatRankIndex($index)" alt="" v-if="!isall">
          <span v-else>{{$index + 1}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :fixed="!isall" prop="nickname" label="昵称"/>
    <el-table-column prop="resCount" label="正确数量" width="150"/>
    <el-table-column prop="failCount" label="错误数量" width="150"/>
    <el-table-column prop="visibleCount" label="跳出页面次数" width="150"/>
    <el-table-column prop="score" label="成绩" width="150">
      <template slot-scope="{ row }">
        <p class="use-time">{{row.score}}分</p>
      </template>
    </el-table-column>
    <el-table-column prop="time" label="答题时间" width="150">
      <template slot-scope="{ row, column, $index }">
        <p class="use-time">{{formatUseTime(row, column, $index)}}</p>
      </template>
    </el-table-column>
    <el-table-column prop="reward" label="奖励" width="150" v-if="!isall">
      <template slot-scope="{ row }">
        <p class="integral-icon">
          <span>{{row.reward}}</span>
          <i class="iconfont icon-jifen"></i>
        </p>
      </template>
    </el-table-column>
    <el-table-column
        v-if="!isall"
        fixed="right"
        label="操作"
        width="100">
      <template slot-scope="{row}">
        <el-button type="primary" size="mini" v-if="row.isreceive" :disabled="row.isreceive">已发送</el-button>
        <el-button type="primary" size="mini" v-else @click="sendReward(row)">发送奖励</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { Table, TableColumn, Button, Notification } from 'element-ui';
  import { parsetimeData, padZero } from '@/utils/utils';
  import { sendReward } from '@/api/request';
  export default {
    name: "WinningList",
    components: {
      'ElTable': Table,
      'ElTableColumn': TableColumn,
      'ElButton': Button,
    },
    props: {
      list: {
        type: Array,
        default: () => ([]),
      },
      game: {
        type: Object,
        default: () =>({}),
      },
      isall: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {}
    },
    computed: {
      listTableData() {
        return this.list.map((item, index) => {
          let { nickname, res_count, fail_count, visible_count, score, time, isreceive, uid } = item;
          return {
            nickname,
            resCount: res_count,
            failCount: fail_count,
            visibleCount: visible_count,
            score,
            time,
            isreceive,
            index,
            reward: this.game.rewards[index],
            uid,
          }
        })
      },
    },
    methods: {
      formatUseTime(row) {
        let { hours, minutes, seconds, days } = parsetimeData(row.time);
        if (days || hours) {
          hours += 24 * days;
          return `${hours}小时${minutes}分钟${padZero(seconds)}秒`
        } else if (minutes) {
          return `${minutes}分钟${padZero(seconds)}秒`
        } else {
          return `${seconds}秒`
        }
      },
      formatRankIndex(index) {
        let arr = ['guanjun', 'yajun', 'jijun']
        return require(`../../assets/imgs/${arr[index]}.png`);
      },
      sendReward(row) {
        let { reward, uid } = row;
        let { rname, rankid } = this.game;
        let info = {
          name: rname,
          integral: reward,
          reward_uid: uid,
          description: `${rname}奖励发放`,
          gameid: rankid,
        }
        sendReward(info).then(() => {
          Notification.success('发送奖励成功');
        }).catch(() => {
          Notification.error('发送奖励出错，请稍后再试');
        }).finally(() => {
          this.$emit('finishSend');
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .rank-index, .integral-icon {
    display: flex;
    height: 100%;
    align-items: center;
    .rank-icon {
      width: 20px;
      height: 20px;
    }
    .iconfont {
      margin-left: 5px;
    }
  }
</style>
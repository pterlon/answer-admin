<template>
  <div class="create-game">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item class="public" label="挑战赛选择" prop="typename">
        <el-radio-group v-model="ruleForm.typename" size="small">
          <el-radio-button label="创建"></el-radio-button>
          <el-radio-button label="已有"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.typename === '已有'" class="public" label="挑战赛名称" prop="name">
        <el-select
          v-model="ruleForm.selected"
          filterable
          size="small"
          placeholder="请输入关键词"
        >
          <el-option
            v-for="item in selectList"
            :key="item.rankid"
            :label="item.rname"
            :value="item.rankid">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-else>
        <el-form-item class="public" label="挑战赛名称" prop="rname">
          <el-input v-model="ruleForm.rname" size="small" placeholder="请输入挑战赛名称"/>
        </el-form-item>
        <el-form-item class="public" label="挑战赛描述" prop="description">
          <el-input type="textarea" :rows="4" v-model="ruleForm.description" size="small" placeholder="请输入挑战赛描述"/>
        </el-form-item>
        <el-form-item class="public" label="开始结束时间" prop="time">
          <el-date-picker
            class="my-date-picker"
            v-model="ruleForm.time"
            value-format="timestamp"
            type="datetimerange"
            size="small"
            range-separator="至"
            start-placeholder="开始答题日期"
            end-placeholder="结束答题日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="public" label="迟到入场时间" prop="latetime">
          <el-date-picker
            v-model="ruleForm.latetime"
            type="datetime"
            value-format="timestamp"
            size="small"
            placeholder="选择迟到入场时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="public" label="结束提示时间" prop="prompttime">
          <el-date-picker
            v-model="ruleForm.prompttime"
            type="datetime"
            value-format="timestamp"
            size="small"
            placeholder="选择结束提示时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="public" label="获奖人数" prop="winningCount">
          <el-input-number v-model="ruleForm.winningCount" :min="1" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item class="public" label="奖励积分" prop="rewards">
          <el-input
            :placeholder="`请输入第${num}名学生获奖的积分`"
            size="small"
            type="number"
            v-for="(num,i) in ruleForm.winningCount"
            :key="num"
            v-model.number="ruleForm.rewards[i]"
          >
            <template #prepend>{{formatRewardText(num)}}</template>
          </el-input>
        </el-form-item>
      </template>
      <el-form-item class="public">
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    Button, Form, FormItem, Input, RadioButton, RadioGroup, Select, Option, Notification,
    DatePicker, InputNumber,
  } from "element-ui";
  import { getOptionalGames, insertTypeTimu, collectGame, insertGame } from '@/api/request'
  import { mapGetters } from 'vuex';
  export default {
    name: "CreateGame",
    components: {
      'ElForm': Form,
      'ElFormItem': FormItem,
      'ElInput': Input,
      'ElRadioGroup': RadioGroup,
      'ElRadioButton': RadioButton,
      'ElButton': Button,
      'ElSelect': Select,
      'ElOption': Option,
      'ElDatePicker': DatePicker,
      'ElInputNumber': InputNumber,
    },
    data() {
      return {
        ruleForm: {
          typename: '创建',
          selected: '',
          rname: '',
          description: '',
          time: [],
          latetime: '',
          prompttime: '',
          winningCount: 3,
          rewards: new Array(3).fill(''),
        },
        rules: {},
        selectList: [],
      }
    },
    computed: {
      ...mapGetters(['realyList', 'alreadyList']),
    },
    watch: {
      'ruleForm.typename': {
        handler(val) {
          if (val === '已有') {
            getOptionalGames().then(res => {
              this.selectList = res.data;
            })
          }
        },
      },
      'ruleForm.winningCount': {
        handler(val, oldVal) {
          if (val > oldVal) {
            this.ruleForm.rewards.push('');
          } else {
            this.ruleForm.rewards.pop();
          }
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.ruleForm.typename === '已有') {
              // 1.创建题目 2.将题目与该挑战赛关联
              await this.insertTimu();
              await this.collectGame();
            } else {
              // 1.创建题目 2.创建挑战赛 3.将题目与挑战赛关联
              await this.insertTimu();
              await this.createGame();
              await this.collectGame();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async insertTimu() {
        let timus = this.realyList;
        try {
          for (let i = 0; i < timus.length; i++) {
            let timu = timus[i];
            let type = this.getTimuType(timu);
            let { data } = await insertTypeTimu(type, timu);
            timu.id = data.insertId;
          }
          Notification.success('题目添加成功');
        } catch (e) {
          console.log(e);
          Notification.error('部分题目添加失败');
        }
      },
      async collectGame() {
        let rankid = this.ruleForm.selected;
        let timus = [...this.realyList, ...this.alreadyList];
        let realylen = this.realyList.length;
        try {
          for (let i = 0; i < timus.length; i++) {
            let timu = timus[i];
            let type = this.getTimuType(timu);
            await collectGame(rankid, timu.id, type);
            if (i < realylen) {
              this.$store.commit('deleteTimu', timu);
            } else {
              this.$store.commit('deleteCreatedTimu', timu);
            }
          }
          Notification.success('题目关联挑战赛成功');
        } catch (e) {
          console.log(e);
          Notification.error('部分题目关联挑战赛失败');
        }
      },
      getTimuType(timu) {
        if (timu.res_json) {
          return 'fill';
        } else if (timu.res.length === 1) {
          return 'single';
        } else if (timu.res.length > 1) {
          return 'multi';
        }
      },
      async createGame() {
        let { rname, description, time, latetime, prompttime, winningCount, rewards } = this.ruleForm;
        let obj = {
          rname,
          description,
          starttime: time[0],
          endtime: time[1],
          latetime,
          prompttime,
          winning_count: winningCount,
          rewards: rewards.join('&&'),
        };
        try {
          await insertGame(obj);
          this.resetForm(formName);
          Notification.success('挑战赛创建成功');
        } catch (e) {
          Notification.error('挑战赛创建失败');
        }
      },
      formatRewardText(num) {
        return `第${num}名`;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .create-game {
    .demo-ruleForm {
      width: 70%;
      .public {
        margin-bottom: 10px;
      }
      .my-date-picker {
        width: 100%;
      }
    }
  }
</style>
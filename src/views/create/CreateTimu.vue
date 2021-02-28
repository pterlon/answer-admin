<template>
  <div class="create-timu">
    <div class="first-step" v-if="step === 1">
      <ul class="operation-list">
        <li :class="{'operation-item': true, active: issingle}" @click="createSingleTimu"><i class="iconfont icon-single-select"></i></li>
        <li :class="{'operation-item': true, active: ismulti}" @click="createMultiTimu"><i class="iconfont icon-duoxuanti"></i></li>
        <li :class="{'operation-item': true, active: isfill}" @click="createFillTimu"><i class="iconfont icon-tiankongti"></i></li>
      </ul>
      <div class="content">
        <single-timu-template v-if="issingle"/>
        <multi-timu-template v-else-if="ismulti"/>
        <fill-timu-template v-else-if="isfill"/>
        <div class="no-check" v-else>请点击上方的相关按钮创建题目</div>
      </div>
    </div>
    <div class="second-step" v-if="step === 2">
      <create-game @finished="finished"/>
    </div>
    <div class="steps-bottom">
      <el-button-group>
        <el-button type="primary" size="mini" :disabled="step === 1" @click="prevStep">上一步</el-button>
        <el-button type="primary" size="mini" :disabled="step === 2" @click="nextStep">下一步</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import SingleTimuTemplate from "@/views/create/SingleTimuTemplate";
  import MultiTimuTemplate from "@/views/create/MultiTimuTemplate";
  import FillTimuTemplate from "@/views/create/FillTimuTemplate";
  import CreateGame from "@/views/create/CreateGame";
  import { Button, ButtonGroup, Notification } from 'element-ui';
  import { mapGetters } from 'vuex';
  export default {
    name: "CreateTimu",
    components: {
      SingleTimuTemplate,
      MultiTimuTemplate,
      FillTimuTemplate,
      'ElButton': Button,
      'ElButtonGroup': ButtonGroup,
      CreateGame,
    },
    data() {
      return {
        issingle: false,
        ismulti: false,
        isfill: false,
        step: 1,
      }
    },
    computed: {
      ...mapGetters(['realyList']),
    },
    methods: {
      createSingleTimu() {
        this.issingle = true;
        this.ismulti = false;
        this.isfill = false;
      },
      createMultiTimu() {
        this.ismulti = true;
        this.issingle = false;
        this.isfill = false;
      },
      createFillTimu() {
        this.isfill = true;
        this.issingle = false;
        this.ismulti = false;
      },
      prevStep() {
        if (this.step <= 1) return;
        this.step--;
      },
      nextStep() {
        if (this.realyList.length < 5) {
          return Notification.warning('创建的题目数量不能小于5条');
        }
        if (this.step >= 2) return;
        this.step++;
      },
      finished() {
        this.step = 1;
        this.$emit('finished')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .create-timu {
    height: 100%;
    display: flex;
    flex-direction: column;
    .first-step {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .operation-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        box-shadow: 0px 0px 3px 0px #cacaca;
        .operation-item {
          height: 30px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &.active {
            background-color: #efefef;
          }
          &:hover {
            background-color: #efefef;
          }
        }
      }
      .content {
        flex: 1;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 15px;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .no-check {
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          font-weight: 600;
        }
      }
    }
    .second-step {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 20px 15px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }
    .steps-bottom {
      height: 35px;
      box-shadow: 0px 0px 3px 0px #cacaca;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
<template>
  <div class="created-list">
    <div class="first-type">我创建的</div>
    <div class="singles">
      <p class="title">
        <span class="title-name">单选题</span>
      </p>
      <ul class="list" v-if="singles.length">
        <li class="item" v-for="(item,i) in singles" :key="i">
          <el-popover>
            <div class="timu-num" slot="reference">{{i+1}}</div>
            <div class="operations">
              <el-button-group>
                <el-button type="primary" size="small" @click="deleteTimu(item)">删除</el-button>
                <el-button type="primary" size="small" @click="editTimu(item)">查看</el-button>
              </el-button-group>
            </div>
          </el-popover>
        </li>
      </ul>
      <div class="normal" v-else>暂时没有添加单选题</div>
    </div>
    <div class="multis">
      <p class="title">
        <span class="title-name">多选题</span>
      </p>
      <ul class="list" v-if="multis.length">
        <li class="item" v-for="(item,i) in multis" :key="i">
          <el-popover>
            <div class="timu-num" slot="reference">{{i+1}}</div>
            <div class="operations">
              <el-button-group>
                <el-button type="primary" size="small" @click="deleteTimu(item)">删除</el-button>
                <el-button type="primary" size="small" @click="editTimu(item)">查看</el-button>
              </el-button-group>
            </div>
          </el-popover>
        </li>
      </ul>
      <div class="normal" v-else>暂时没有添加多选题</div>
    </div>
    <div class="fills">
      <p class="title">
        <span class="title-name">填空题</span>
      </p>
      <ul class="list" v-if="fills.length">
        <li class="item" v-for="(item,i) in fills" :key="i">
          <el-popover>
            <div class="timu-num" slot="reference">{{i+1}}</div>
            <div class="operations">
              <el-button-group>
                <el-button type="primary" size="small" @click="deleteTimu(item)">删除</el-button>
                <el-button type="primary" size="small" @click="editTimu(item)">查看</el-button>
              </el-button-group>
            </div>
          </el-popover>
        </li>
      </ul>
      <div class="normal" v-else>暂时没有添加填空题</div>
    </div>
    <div class="second-type">他人创建的</div>
    <div class="singles">
      <p class="title">
        <span class="title-name">所有题型</span>
      </p>
      <ul class="list" v-if="alreadyList.length">
        <li class="item" v-for="(item,i) in alreadyList" :key="i">
          <el-popover>
            <div class="timu-num" slot="reference">{{i+1}}</div>
            <div class="operations">
              <el-button-group>
                <el-button type="primary" size="small" @click="deleteAreadlyTimu(item)">删除</el-button>
                <el-button type="primary" size="small" @click="editTimu(item)">查看</el-button>
              </el-button-group>
            </div>
          </el-popover>
        </li>
      </ul>
      <div class="normal" v-else>暂时没有添加别人的题目</div>
    </div>
    <el-dialog
        :visible.sync="isedit"
        append-to-body
    >
      <look-timu :timu="currtimu"/>
    </el-dialog>
  </div>
</template>

<script>
  import { Popover, Button, ButtonGroup, Dialog } from 'element-ui'
  import LookTimu from "@/components/LookTimu";
  import { mapGetters } from 'vuex';
  export default {
    name: "CreatedList",
    components: {
      'ElPopover': Popover,
      'ElButton': Button,
      'ElButtonGroup': ButtonGroup,
      'ElDialog': Dialog,
      LookTimu,
    },
    data() {
      return {
        isedit: false,
        currtimu: null,
      }
    },
    computed: {
      ...mapGetters(['realyList', 'alreadyList']),
      singles() {
        return this.realyList.filter(tm => tm.res?.length === 1);
      },
      multis() {
        return this.realyList.filter(tm => !tm.res_json && tm.res?.length > 1);
      },
      fills() {
        return this.realyList.filter(tm => !!tm.res_json);
      }
    },
    methods: {
      deleteTimu(timu) {
        this.$store.commit('deleteTimu', timu);
      },
      editTimu(timu) {
        this.isedit = true;
        this.currtimu = timu;
      },
      deleteAreadlyTimu(timu) {
        this.$store.commit('deleteCreatedTimu', timu);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .created-list {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .first-type, .second-type {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 600;
    }
    .singles, .multis, .fills {
      margin-bottom: 10px;
      .title {
        display: flex;
        align-items: center;
        .title-name {
          padding-left: 5px;
          border-left: 3px solid #5754fd;
          font-size: 12px;
        }
      }
      .list {
        margin: 5px 0;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 12.5%;
          margin-bottom: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          .timu-num {
            cursor: pointer;
            padding: 2px;
            font-size: 12px;
            width: 17px;
            height: 17px;
            border-radius: 4px;
            background-color: #5754fd;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .normal {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }
  }
</style>
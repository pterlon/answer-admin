<template>
  <div class="create-timu">
    <ul class="operation-list">
      <li class="operation-item" @click="createSingleTimu"><i class="iconfont icon-single-select"></i></li>
      <li class="operation-item" @click="createMultiTimu"><i class="iconfont icon-duoxuanti"></i></li>
      <li class="operation-item" @click="createFillTimu"><i class="iconfont icon-tiankongti"></i></li>
    </ul>
    <div class="content">
      <single-timu-template v-if="issingle"/>
      <multi-timu-template v-else-if="ismulti"/>
      <fill-timu-template v-else-if="isfill"/>
    </div>
  </div>
</template>

<script>
  import SingleTimuTemplate from "@/views/create/SingleTimuTemplate";
  import MultiTimuTemplate from "@/views/create/MultiTimuTemplate";
  import FillTimuTemplate from "@/views/create/FillTimuTemplate";
  export default {
    name: "CreateTimu",
    components: {
      SingleTimuTemplate,
      MultiTimuTemplate,
      FillTimuTemplate,
    },
    data() {
      return {
        issingle: false,
        ismulti: false,
        isfill: false,
      }
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
    },
  }
</script>

<style lang="scss" scoped>
  .create-timu {
    height: 100%;
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
    }
  }
</style>
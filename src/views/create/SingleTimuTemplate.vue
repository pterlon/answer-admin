<template>
  <div class="single-timu-template">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item class="public" label="题目名类型" prop="typename">
        <el-radio-group v-model="ruleForm.typename" size="small">
          <el-radio-button label="文字"></el-radio-button>
          <el-radio-button label="图片"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.typename === '文字'" class="public" label="题目名称" prop="name">
        <el-input type="textarea" :rows="4" v-model="ruleForm.name" size="small"/>
      </el-form-item>
      <el-form-item v-else class="public" label="题目图片" prop="img">
        <el-upload
            class="my-upload"
            action="#"
            list-type="picture-card"
            :multiple="false"
            :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item class="public" label="选项数量" prop="optionsCount">
        <el-input-number size="small" :min="2" :max="10" v-model="ruleForm.optionsCount"></el-input-number>
      </el-form-item>
      <el-form-item class="public" label="各选项内容" prop="options">
        <el-input
          class="item-input"
          :placeholder="`请输入${formatItem(i)}选项的内容`"
          size="small"
          v-for="(num,i) in ruleForm.optionsCount"
          :key="num"
          v-model="ruleForm.options[i]"
        >
          <template slot="prepend">{{formatItem(i)}}</template>
        </el-input>
      </el-form-item>
      <el-form-item class="public" label="正确的选项" prop="res">
        <el-radio-group v-model="ruleForm.res[0]" size="small">
          <el-radio-button :label="formatItem(num-1)" v-for="num in ruleForm.optionsCount" :key="num"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="public" label="题目解析" prop="description">
        <el-input type="textarea" :rows="4" v-model="ruleForm.description" size="small"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="showuploadimg">
      <img width="100%" :src="uploadImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {
    Form, FormItem, Input, RadioGroup, RadioButton, Upload, Dialog, InputNumber, Button,
  } from 'element-ui';
  export default {
    name: "SingleTimuTemplate",
    components: {
      'ElForm': Form,
      'ElFormItem': FormItem,
      'ElInput': Input,
      'ElRadioGroup': RadioGroup,
      'ElRadioButton': RadioButton,
      'ElUpload': Upload,
      'ElDialog': Dialog,
      'ElInputNumber': InputNumber,
      'ElButton': Button,
    },
    data() {
      return {
        ruleForm: {
          typename: '文字',
          name: '',
          img: '',
          optionsCount: 4,
          options: new Array(4).fill(''),
          res: [''],
          description: '',
        },
        rules: {},
        showuploadimg: false,
        uploadImgUrl: '',
      }
    },
    watch: {
      'ruleForm.optionsCount': {
        handler(val, oldVal) {
          if (val > oldVal) {
            this.ruleForm.options.push('');
          } else {
            this.ruleForm.options.pop();
          }
        },
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.uploadImgUrl = file.url;
        this.showuploadimg = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      handleRemove(file) {
        console.log(file);
      },
      formatItem(num) {
        return String.fromCharCode(65 + num);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style lang="scss">
  .single-timu-template {
    .demo-ruleForm {
      width: 70%;
      .public {
        margin-bottom: 10px;
      }
      .my-upload {
        .el-upload {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
        .el-upload-list__item {
          width: 100px;
          height: 100px;
        }
        .el-upload-list__item-actions {
          font-size: 16px;
        }
      }
      .item-input {
        margin-bottom: 5px;
      }
    }
  }
</style>
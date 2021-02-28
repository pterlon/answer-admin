<template>
  <div class="fill-timu-template">
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
            ref="upload"
            :http-request="fetchUploadImg"
            list-type="picture-card"
            :multiple="false">
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
        <el-input-number size="small" :min="1" :max="5" v-model="ruleForm.resCount"></el-input-number>
      </el-form-item>
      <el-form-item class="public" label="各选项内容" prop="options">
        <el-input
          class="item-input"
          :placeholder="`请输入${formatItem(num)}的内容，有多个可能的值以&&分隔`"
          size="small"
          v-for="(num,i) in ruleForm.resCount"
          :key="num"
          v-model="ruleForm.options[i]"
        >
          <template slot="prepend">{{formatItem(num)}}</template>
        </el-input>
      </el-form-item>
      <el-form-item class="public" label="分值" prop="score">
        <el-input-number size="small" :precision="1" :step="0.5" :min="1" :max="3" v-model="ruleForm.score"/>
      </el-form-item>
      <el-form-item class="public" label="题目解析" prop="description">
        <el-input type="textarea" :rows="4" v-model="ruleForm.description" size="small"/>
      </el-form-item>
      <el-form-item class="public">
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
  Button, Dialog, Form, FormItem, Input, InputNumber, Notification, RadioButton, RadioGroup, Upload
} from 'element-ui';
import {uploadImg} from "@/api/request";
  export default {
    name: "FillTimuTemplate",
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
          options: new Array(1).fill(''),
          resCount: 1,
          description: '',
          score: 1,
        },
        rules: {},
        showuploadimg: false,
        uploadImgUrl: '',
      }
    },
    watch: {
      'ruleForm.resCount': {
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
      handleRemove(file) {
        this.$refs.upload.handleRemove(file);
      },
      async fetchUploadImg({ file }) {
        let form = new FormData();
        form.append('file', file);
        try {
          let res = await uploadImg(form);
          this.ruleForm.img = res.data.path;
          Notification.success('图片上传成功');
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
      formatItem(num) {
        return `第${num}项`;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.formatTimuData(this.ruleForm);
            console.log(data);
            this.$store.commit('setTimu', data);
            this.resetForm(formName);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      formatTimuData(formData) {
        let data = {};
        if (formData.typename === '文字') {
          data.name = formData.name.trim();
        } else {
          data.img = formData.img;
        }
        data.res_json = formData.options.map(item => {
          return item.split('&&');
        });
        data.res_count = formData.resCount;
        data.description = formData.description.trim();
        data.score = formData.score;
        return data;
      },
    },
  }
</script>

<style lang="scss">
  .fill-timu-template {
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
    }
  }
</style>
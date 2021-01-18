<template>
  <div class="uploadfile">
    <el-upload
      class="upload-demo"
      name="file"
      :with-credentials="true"
      drag
      :action="`${baseURL}/fileDispose/upload`"
      multiple
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccessUpload"
      :on-error="handleErrorUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">请选择文件并上传</div>
    </el-upload>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { messageTip } from '@/utils/ele'
export default {
  data() {
    return {
      loading: null
    };
  },
  props: ["baseURL"],
  beforeDestroy() {
    //退出之间，将未关闭的Loading关闭
    this.loading && this.loading.close();
  },
  deactivated() {
    this.loading && this.loading.close();
  },
  methods: {
    handleBeforeUpload() {
      let loading = Loading.service({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        customClass: "loadClass"
      });
      this.loading = loading;
    },
    handleSuccessUpload() {
	  this.loading.close();
	  messageTip('success','上传成功！')
    },
    handleErrorUpload() {
	  this.loading.close();
	   messageTip('error','上传失败！')
    }
  }
};
</script>
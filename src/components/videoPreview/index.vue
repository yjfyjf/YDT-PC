<template>
  <div class="dialogVideoBox">
    <el-dialog :visible.sync="visible" top="0" width="100%">
      <video v-if="visible" :src="videoUrl" controls="controls"/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVideoVisible: {
      // 需要加sync
      type: Boolean,
      default: false
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVideoVisible
      },
      set(val) {
        this.$emit('update:dialogVideoVisible', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogVideoBox {
    /deep/ .el-dialog{
      background: rgba(225, 225, 225, 0);
    }
    /deep/ .el-dialog__header{
      padding:0;
    }
    /deep/ .el-dialog__body{
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    video{
      max-width:100%;
      max-height:100%;
    }
    /deep/ .el-dialog__headerbtn {
      transform:scale(3);
      top:60px;
      right:60px;
    }
}
</style>

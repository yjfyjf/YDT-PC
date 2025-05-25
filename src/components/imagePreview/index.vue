<template>
  <div class="imgDialog">
    <el-dialog :visible.sync="visible" top="-100vh">
      <el-image-viewer v-if="visible" :url-list="imageList" :on-close="closeViewer" :first-index="index"/>
    </el-dialog>
  </div>
</template>

<script>
import ElImageViewer from './image-viewer'
export default {
  components: { ElImageViewer },
  props: {
    dialogImgVisible: {
      // 需要加sync
      type: Boolean,
      default: false
    },
    imageList: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogImgVisible
      },
      set(val) {
        this.$emit('update:dialogImgVisible', val)
      }
    }
  },
  methods: {
    closeViewer() {
      this.visible = false
    }
  }
}
</script>


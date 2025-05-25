<template>
  <div class="app-wrapper">
      <div class="main-container-h5">
        <app-main/>
      </div>
  </div>
</template>

<script>
// TagsView
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      isAndroid: false,
      isiOS: false,
      isWeChat: false,
      from: '',
      timeStart: '',

    }
  },
  created() {
    this.from = sessionStorage.getItem('from') || this.$route.query.from
  },
  methods: {
  },
  beforeDestroy() {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container{
      padding: 40px 0 0 0;
    }
    .main-container_android{
      padding: 18px 0 0 0;
    }
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .left_img {
      padding: 0 12px 0 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>

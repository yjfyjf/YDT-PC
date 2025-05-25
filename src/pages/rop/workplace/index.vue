<template>
  <div class="workplace-page">
    <div class="workplace-container">
      <!-- <img :src="require('@/assets/views/workplace/welcome.png')"> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Workplace',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {},
  methods: {

  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.workplace-page {
  position: relative;
  height: calc(100vh - 50px);
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  font-variant: tabular-nums;
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  color: rgba(0, 0, 0, .65);
  background: #3b97ff;
    .workplace-container {
      text-align:center
    }
}
</style>

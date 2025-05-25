<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <!-- <router-view :key="key"/> -->
      <!-- </keep-alive> -->
      <keep-alive :include="cachePages">
        <router-view/>
      </keep-alive>
      <!-- <router-view/> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {}
  },
  computed: {
    cachePages() {
      return this.$store.state.cachePages
    },
    // cachedViews() {
    // console.log('cachedViews', this.$store.state.tagsView.cachedViews)
    // return this.$store.state.tagsView.cachedViews
    // },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +50 */
  /* min-height: calc(100vh - 50px); */
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>


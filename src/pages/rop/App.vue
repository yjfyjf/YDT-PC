<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <!-- 需要缓存的视图组件 -->
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      a: ''
    }
  }
}
</script>

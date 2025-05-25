<template>
  <div/>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  created() {
    this.login()
  },
  methods: {
    login() {
      const params = {
        mobile: '13800138000',
        verificationCode: '000000',
      }
      this.$store.dispatch('LoginByUsername', JSON.stringify(params)).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      })
        .catch(e => {
          return this.$message.error(e.msg || '登录失败')
        })
    }
  }
}
</script>
<style lang="scss" scope>
</style>

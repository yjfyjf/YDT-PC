<script>
export default {
  data() {
    return {}
  },
  beforeCreate() {
    console.log('redirect beforeCreate', this.$route)
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>

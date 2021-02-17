export const islogin = {
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    login() {
      return !!this.userinfo;
    }
  }
}
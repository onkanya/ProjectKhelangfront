<template>
  <v-app id="layout-app" v-if="!isLoading">
    <Header @Logout="checkLogout" v-if="isLogin" />
    <Login @Login="checkLogin" v-else />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from './components/Header'
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Header,
    Login
  },
  data () {
    return {
      isLogin: false,
      isLoading: true
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const user = localStorage.getItem('userLogin')
      if (user !== null && user !== undefined) {
        this.isLogin = true
      }
      this.isLoading = false
    },
    checkLogout () {
      this.isLogin = false
      this.$router.push('/')
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Kanit:100,200,300,400,500,600,700');
  body, html {
    font-family: 'Kanit';
  }
  #layout-app {
    font-family: 'Kanit';
  }
  .toolbar {
     background-image: linear-gradient(#2962ff, #00b0ff);
  }
</style>


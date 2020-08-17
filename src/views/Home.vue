<template>
  <div class="container">
    <nav-bar></nav-bar>
    <head-bar></head-bar>
    <main-content>
    </main-content>
  </div>
</template>

<script>
import axios from 'axios'
import HeadBar from './HeadBar'
import NavBar from './NavBar'
import MainContent from './MainContent'

export default {
  name: 'Home',
  components: {
    HeadBar,
    NavBar,
    MainContent
  },
  methods: {
    changeLanguage(lang) {
      lang === '' ? 'zh_CN' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    },
    testAxios() {
      axios.get('http://localhost:8080').then(res => {
        alert(res.data)
      })
    }
  }
}
</script>

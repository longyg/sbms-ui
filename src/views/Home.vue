<template>
  <div class="container">
    <nav-bar></nav-bar>
    <head-bar></head-bar>
    <main-content>
    </main-content>
  </div>
</template>

<script>
import HeadBar from './HeadBar'
import NavBar from './NavBar'
import MainContent from './MainContent'

export default {
  name: 'Home',
  components: {
    HeadBar,
    NavBar,
    MainContent
  }
}
</script>

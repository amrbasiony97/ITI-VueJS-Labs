<template>
  <div class="d-flex">
    <div class="left">
      <Sidebar/>
    </div>
    <div class="right w-100">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'

export default {
  name: 'MainWrapper',
  components: {
    Header,
    Sidebar,
    Content,
    Footer
  }
}
</script>

<template>
    <Navbar />
    <div class="Home">
        <h1>Home</h1>
    </div>
    <Footer />
</template>
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
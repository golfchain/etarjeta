<template>
  <Header />
  <router-view />
  <div class="p-4">Version:10-11T20:25</div>
  
</template>


<script>
import Header from './components/Header.vue'
export default {
  components:{
    Header
  }
}
</script>
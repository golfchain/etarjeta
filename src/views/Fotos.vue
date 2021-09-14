<template>
<div  class="grid grid-cols-2 ">
  <router-link  v-for="(img, index) in fotos" :key="img" to="/foto/1/1"  class="p-1">
    <img  :src="img" alt="A photo of a fox" />
    <h1 class="p-3 text-center">HOYO {{index+1}}</h1>
  </router-link>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const fotos = new Array(18).fill(0).map((i) => "https://picsum.photos/200");
    return { fotos };
  },
};
</script>
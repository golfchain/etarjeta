<template>
  <div class="text-center center">
    <img class="mx-auto" :src="foto" alt="" />
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const foto = "https://picsum.photos/200";
    return { foto };
  },
};
</script>
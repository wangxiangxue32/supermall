<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "Mine",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar{
    color: #fff;
    background-color: #ff8198;
  }
</style>

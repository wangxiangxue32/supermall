<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #c4c4c4;
  }

  .check{
    border-color: #ff5f91;
    background-color: #ff5f91;
  }
</style>

<template>
  <div class="shoppingCart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{ cartGoodsNum }})
      </div>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from './childComps/CartList'
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "ShoppingCart",
    components: {
      CartBottomBar,
      NavBar,
      CartList
    },
    computed: {
      //可以直接取到 getters 中的方法，变为计算属性，可以直接使用
      ...mapGetters(['cartGoodsNum'])
      //也可以自己重新命名
      // ...mapGetters({
      //   length: 'cartGoodsNum'
      // })
    }
  }
</script>

<style scoped>
  .shoppingCart{
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: white;
  }
</style>

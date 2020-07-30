<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button
        class="check-box"
        :is-checked="isSelectAll"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{ totalPrice }}
    </div>

    <div class="calc" @click="calcClick">
      结算({{ checkLength }})
    </div>
  </div>
</template>

<script>


  import CheckButton from "./CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if (this.$store.state.cartList.length === 0) return false

        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){  //全选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calcClick(){
        if (this.$store.state.cartList.length === 0){
          this.$toast.show('购物车为空')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    /*line-height: 40px;*/
    display: flex;
    font-size: 13px;
  }

  .check-area{
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    width: 60px;
    height: 40px;
    margin-left: 10px;
  }

  .check-box{
    /*width: 20px;*/
    /*height: 20px;*/
    /*line-height: 20px;*/
    margin-right: 5px;
  }

  .price{
    /*align-items: center;*/
    line-height: 40px;
    margin-left: 20px;
    flex: 1;
  }

  .calc{
    color: #fff;
    line-height: 40px;
    text-align: center;
    width: 90px;
    height: 100%;
    background-color: orangered;
  }
</style>
